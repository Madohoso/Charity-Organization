from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response 
from .models import Event , Donation
from django.db.models import F
from .serializers import EventSerializer , PaymentIntentSerializer
import stripe 
import pytz
from rest_framework.permissions import IsAuthenticated

stripe.api_key = 'sk_test_51MLOnbBbxPkcPsN0T3GAUaK3Q9F0qfTCbqJRpXt0iNqcTDDvLLVv3cBxf318fjxCMvOa9dmtUDvYkx3cLnYAEHq900HXtIGDbv'

utc= pytz.UTC
# Create your views here.

class Paginator(PageNumberPagination):
    page_size = 12
    max_page_size = 12

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })

class EventView(ListAPIView):

    queryset = Event.objects.filter(desired_amount__gt=F('current_amount'))
    pagination_class = Paginator
    serializer_class = EventSerializer


class CreateDonationRequest(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        body = request.data
        print(body)
        amount = 0
        try:
            amount = int(body['amount'])
            # print(amount)
        except:
            return Response(status=400)

        payment_intent = stripe.PaymentIntent.create(amount=amount*100,currency='usd')
        donation = Donation(event_id=body['event'],payment_intent=payment_intent.client_secret,user=request.user,amount=amount,status=Donation.status_dict['pending'])
        donation.save()
        return Response({"paymentIntent":payment_intent.client_secret})


class IntentListener(APIView):

    def post(self,request):

        payload = request.body
        event = None
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            event = stripe.Event.construct_from(
                request.data, sig_header, stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return Response(status=400)

        except stripe.error.SignatureVerificationError as e:
            return Response(status=400)
        
        if event.type == 'payment_intent.succeeded':
            payment_method = event.data.object
            try:
                donation = Donation.objects.get(payment_intent=payment_method.client_secret)
                donation.status = Donation.status_dict['paid']
                donation.save()
                event = Event.objects.get(pk=donation.event.id)
                event.current_amount += donation.amount
                event.save()
            except:
                return Response(status=400)
            
        return Response(status=200)


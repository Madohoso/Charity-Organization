from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response 
from .models import Event
from django.db.models import F
from .serializers import EventSerializer

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


# class Crea


from rest_framework.serializers import ModelSerializer , Serializer , CharField
from .models import Event

class EventSerializer(ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Event


class PaymentIntentSerializer(Serializer):

    paymentIntent = CharField()

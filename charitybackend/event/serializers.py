from rest_framework.serializers import ModelSerializer
from .models import Event

class EventSerializer(ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Event



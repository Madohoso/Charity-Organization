from rest_framework.serializers import ModelSerializer


class EventSerializer(ModelSerializer):

    class Meta:
        fields = '__all__'

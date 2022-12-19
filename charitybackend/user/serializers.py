from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import AccessToken
User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['userId'] = self.user.id
        return data

class CustomTokenRefreshSerializer(TokenRefreshSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        access_token = AccessToken(data['access'])
        data['userId'] = access_token['user_id']
        return data

class UserSerializer(serializers.ModelSerializer):
    password= serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = '__all__'


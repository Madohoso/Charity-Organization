from datetime import datetime
from django.shortcuts import render
from .serializers import CustomTokenObtainPairSerializer,CustomTokenRefreshSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import APIException
from .models import MyUser
from rest_framework_simplejwt.views import TokenViewBase
import re


regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def isValid(email):
    return re.fullmatch(regex, email) 


class TokenObtainPairView(TokenViewBase):

    serializer_class = CustomTokenObtainPairSerializer

class TokenRefreshView(TokenViewBase):

    serializer_class = CustomTokenRefreshSerializer


class RegisterView(APIView):

    def post(self,request):
        email = request.data.get('email')
        name = request.data.get('name')
        password = request.data.get('password')
        confirmPassword = request.data.get('confirmPassword')

        if(not email or not name or not password or not confirmPassword):
            raise APIException(detail="all fields are required [name,email,password,confirmPassword]")

        if(password != confirmPassword):
            raise APIException(detail="password and confirm password must match")

        if not (isValid(email)):
            raise APIException(detail="enter valid email address")
        
        try:
            MyUser.objects.create_user(email=email,name=name,password=password)
        except Exception as e :
            print(e)
            raise APIException("email is already used")

        return Response(status=200)



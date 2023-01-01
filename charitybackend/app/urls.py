from django.urls import path
from .views import index,indexId

urlpatterns = [
    path('',index),
    path('event/<int:id>',index),
    path('login',index),
    path('register',index),
]
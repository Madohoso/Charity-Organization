
from django.urls import path
from .views import EventView , CreateDonationRequest , IntentListener

urlpatterns = [ 
    path('Events/',EventView.as_view(),name='Events'),
    path('DonateReq/',CreateDonationRequest.as_view(),name='Donation'),
    path('stripehook/',IntentListener.as_view(),name='stripehook')
]
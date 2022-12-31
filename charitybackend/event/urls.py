
from django.urls import path
from .views import EventView

urlpatterns = [ 
    path('Events/',EventView.as_view(),name='Events')
]
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Event(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()
    desired_amount = models.PositiveIntegerField()
    current_amount = models.PositiveIntegerField(default=0)
    photo = models.ImageField(upload_to='images/',blank=True,null=True)

class Donation(models.Model):

    status_dict = {
        'paid': 'p',
        'pending':'w'
    }

    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    payment_intent = models.CharField(max_length=100,blank=True,null=True)
    user = models.ForeignKey(User,on_delete=models.RESTRICT)
    status = models.CharField(max_length=1,default='w')
    amount = models.PositiveIntegerField(default=10)
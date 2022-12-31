from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):

    title = models.CharField(max_length=70)

    def __str__(self):
        return self.title

class Item(models.Model):

    description = models.CharField(max_length=200)
    category = models.ForeignKey(Category,on_delete=models.RESTRICT)
    donated_user = models.ForeignKey(User,on_delete=models.RESTRICT,null=True,blank=True)

    def __str__(self):

        if len(self.description) <= 50:
            return self.description
        else: 
            return self.description[:48]+'..'
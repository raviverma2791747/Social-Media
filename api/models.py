from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.EmailField(max_length=254, default='')

    def __str__(self):
        return self.first_name

class Post(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    #type = models.
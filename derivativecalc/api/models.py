from django.db import models

# Create your models here.
class Calculation(models.Model):
    f = models.CharField(max_length=100, default="", unique=True)
    derivative = models.CharField(max_length=100, default="", unique=True)
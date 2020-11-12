from django.shortcuts import render
from rest_framework import generics
from .models import Calculation
from .serializers import CalculationSerializer

# Create your views here.

class CalcView(generics.ListCreateAPIView):
    queryset = Calculation.objects.all()
    serializer_class = CalculationSerializer

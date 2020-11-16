from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Calculation
from .serializers import CalculationSerializer, GetDerivativeSerializer

from .calculate import sk

# Create your views here.

class CalculationView(generics.ListCreateAPIView):
    queryset = Calculation.objects.all()
    serializer_class = CalculationSerializer

class GetDerivativeView(APIView):
    serializer_class = GetDerivativeSerializer

    def post(self, request, format=None):
        print(request)
        print("hello")
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            f = serializer.data.get('f')
            derivative = sk.derivate(f)
            host = self.request.session.session_key
            
            calculation = Calculation(host=host, f=f, derivative=derivative)
            calculation.save()
            return Response(CalculationSerializer(calculation).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)




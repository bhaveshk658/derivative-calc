from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Calculation
from .serializers import CalculationSerializer, GetDerivativeSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

import json
from .calculate import sk

# Create your views here.

class CalculationView(generics.ListCreateAPIView):
    queryset = Calculation.objects.all()
    serializer_class = CalculationSerializer

class GetDerivativeView(APIView):
    serializer_class = GetDerivativeSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if True:#serializer.is_valid():
            f = request.data['f']
            derivative = sk.derivate(f)
            
            calculation = Calculation(f=f, derivative=derivative)
            return Response(GetDerivativeSerializer(calculation).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(('POST', 'GET'))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def post(request):
    data = json.loads(request.body.decode('utf-8'))
    f = data['expression']
    derivative = sk.derivate(f)

    calculation = Calculation(f=f, derivative=derivative)

    res = Response(GetDerivativeSerializer(calculation).data, status=status.HTTP_201_CREATED)
    return res
    #return JsonResponse({'derivative': derivative}, status=201)






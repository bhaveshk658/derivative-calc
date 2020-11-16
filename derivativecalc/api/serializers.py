from rest_framework import serializers
from .models import Calculation

class CalculationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculation
        fields = ('id', 'f', 'derivative')

class GetDerivativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculation
        fields = ('f')
        
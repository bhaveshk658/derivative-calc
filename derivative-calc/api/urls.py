from django.urls import path
from .views import CalculationView, GetDerivativeView, post

urlpatterns = [
    path('home', CalculationView.as_view()),
    path('get-derivative', GetDerivativeView.as_view())
]
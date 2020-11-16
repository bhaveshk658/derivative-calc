from django.urls import path
from .views import CalculationView, GetDerivativeView

urlpatterns = [
    path('home', CalculationView.as_view()),
    path('get-derivative/', GetDerivativeView.post, name="get-derivative")
]
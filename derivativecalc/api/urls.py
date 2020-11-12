from django.urls import path
from .views import CalcView

urlpatterns = [
    path('home', CalcView.as_view())
]
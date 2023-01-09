from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Connects the token to your application
    path('test/', views.test),
    path('products/', views.products),
    path('register/', views.register)
]
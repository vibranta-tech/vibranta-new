from django.urls import path
from . import views
urlpatterns = [
    path('test/', views.test_payment, name='test_payment'),
    path('', views.create_payment, name='payment'),
    path('verify_payment/', views.payment_verification, name='verify_payment'),
   
]


from django.urls import path
from . import views


urlpatterns = [
    path('',views.events, name ='events'),
    path('layout/',views.layout, name ='layout'),
    path('base/',views.base, name ='base'),
 
    

]
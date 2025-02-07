from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('',views.user_login, name='login'),
    path('register/',views.user_register, name='register'),
    path('logout/',views.user_logout, name ='logout'),
    path('account/',include('allauth.urls')),
    
    
    #password reset
    path('reset_password/',views.CustomPasswordResetView,name='reset_password'),
    path('reset_password_sent/',views.PasswordResetDoneView,name='password_reset_done'),
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='apps/accounts/confirm_pass.html') ,name='password_reset_confirm'),
    path('reset_password_complete',views.PasswordResetCompleteView,name='password_reset_complete'),


]
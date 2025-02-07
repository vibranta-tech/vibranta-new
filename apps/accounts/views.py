from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.contrib import messages
from .forms import UserRegisterForm
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import views as auth_views

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)  # Generate JWT refresh token for the user
    return {
        'refresh': str(refresh),               # Refresh token to obtain new access tokens
        'access': str(refresh.access_token),    # Access token used for actual requests
    }




def user_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            tokens = get_tokens_for_user(user)  # Get JWT tokens
            response = redirect('events')  # Redirect to home page after successful login
            response.set_cookie('access', tokens['access'], httponly=True)  # Store access token in cookie
            response.set_cookie('refresh', tokens['refresh'], httponly=True)  # Store refresh token in cookie
            return response
        else:
            # Return an 'invalid login' error message.
            messages.success(request,("Invalid Crenditials, Retry!"))
            return redirect('login')
    return render(request,'apps/accounts/login.html')



def user_register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Get the user object without saving to the database
            user.save()  # Now save the user to the database
            messages.success(request, "Registration successful. You can now log in.")
            return redirect('register')
        else:
            messages.error(request, "Registration failed. Please correct the errors below.")
    else:
        form = UserRegisterForm()

    return render(request, 'apps/accounts/login.html', {'form': form})

def user_logout(request):
    logout(request)
    response = redirect("login")  # Redirect user to login page
    response.delete_cookie('access')  # Delete access token cookie
    response.delete_cookie('refresh')  # Delete refresh token cookie
    return response


def CustomPasswordResetView(request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            if User.objects.filter(email=email).exists():
                form.save(
                    request=request,
                    use_https=request.is_secure(),
                    email_template_name='apps/accounts/reset_pass_mail.html',
                )
                messages.success(request, 'Password reset link has been sent to your email.')
                return redirect(reverse('password_reset_done'))
            else:
                context = {
                    "message": {
                        "type": "alert",
                        "title": "Error",
                        "description": "Email address is not registered."
                    }
                }
                return render(request, 'apps/accounts/login.html', context)
        else:
            return JsonResponse({'error': 'Invalid form submission.'}, status=400)
    else:
        form = PasswordResetForm()
    return render(request, 'apps/accounts/reset_pass.html', {'form': form})



def PasswordResetDoneView(request):
    context = {
        "message":{
                "type":"alert",
                "title":"Success",
                "description" :'''We’ve emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder.'''
            }
    }
    return render(request,'apps/accounts/login.html',context)

def PasswordResetCompleteView(request):
        context = {
        "message":{
                "type":"alert",
                "title":"Success",
                "description" :'''Your password has been set. You may go ahead and log in now.'''
            }
    }
        return render(request,'apps/accounts/login.html',context)
    
    

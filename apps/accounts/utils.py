# decorators.py (or you can add this in views.py)
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import redirect


#JWT
def jwt_required(view_func):
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('access')  # Look for the token in cookies
        
        if not token:
            return redirect('login')  # Redirect to login if no token
        
        try:
            AccessToken(token)  # Validate the token
        except AuthenticationFailed:
            return redirect('login')  # Invalid token, redirect to login
        
        return view_func(request, *args, **kwargs)  # Proceed to the protected view

    return wrapper

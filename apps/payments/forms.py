from django import forms
from .models import Payment
from django.contrib.auth.models import User

class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['event', 'user', 'payment_id', 'amount', 'status']
        
    # Optionally add custom validation if needed
    def clean_payment_id(self):
        payment_id = self.cleaned_data.get('payment_id')
        if not payment_id:
            raise forms.ValidationError("Payment ID is required.")
        return payment_id
    
    def clean_amount(self):
        amount = self.cleaned_data.get('amount')
        if amount <= 0:
            raise forms.ValidationError("Amount must be greater than zero.")
        return amount

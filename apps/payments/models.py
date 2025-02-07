from django.db import models
from apps.events.models import Event
from django.contrib.auth.models import User

# Create your models here.
class Payment(models.Model):
    MEMBER_CHOICES = [
        (1, "1 Member"),
        (2, "2 Members"),
        (3, "3 Members"),
    ]
    event = models.ForeignKey(Event, on_delete=models.CASCADE,)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    payment_id = models.CharField(max_length=100,unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.IntegerField(choices=MEMBER_CHOICES, default=1)

    def __str__(self):
        return f"Payment {self.payment_id} - {self.status}"

class Member(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    reg_no = models.IntegerField() 
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    section = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.reg_no}"
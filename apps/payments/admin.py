from django.contrib import admin
from .models import  Payment,Member

from django.contrib.auth.admin import UserAdmin
from .models import User


# Customize Payment admin interface
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id','payment_id', 'event', 'amount', 'status', 'created_at')
    search_fields = ('payment_id', 'event__name')
    list_filter = ('status', 'created_at')
    ordering = ('-created_at',)
    
@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'reg_no', 'email', 'phone', 'section', 'created_at')
    search_fields = ('payment_id',)
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    
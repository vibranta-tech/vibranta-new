from django.contrib import admin
from .models import Event,Judge


# Customize Event admin interface
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'datetime', 'price')
    search_fields = ('name', 'description')
    list_filter = ('datetime',)
    ordering = ('datetime',)



@admin.register(Judge)
class JudgeAdmin(admin.ModelAdmin):
    list_display = ('id','event','name', 'profession')
    search_fields = ('name', 'event')
    list_filter = ('event',)
    ordering = ('id',)


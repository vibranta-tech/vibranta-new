from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    span = models.CharField(max_length=200, null=True, blank=True)  # To store the duration of the event
    datetime = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # To store the price of the event
    duration = models.DurationField(null=True, blank=True)  # To store the duration of the event
    venue = models.CharField(max_length=255,null=True,blank=True)  # Store venue name or location
    focus = models.CharField(max_length=255,null=True,blank=True)  # What the event focuses on (e.g., Music, Technology, etc.)
    organizer = models.CharField(max_length=255, null=True, blank=True)  # Optional field to store event organizer
    capacity = models.PositiveIntegerField(null=True, blank=True)  # Optional field to store event capacity
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)  # Optional image for the event
    description = models.TextField(null=True, blank=True)  # Optional field to store event description
    rules = models.TextField(null=True, blank=True)  # Optional field to store event rules
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on save
    def __str__(self):
        return self.name
    
    
class Judge(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='event/judges/', null=True, blank=True)
    name = models.CharField(max_length=200)
    profession = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    company = models.CharField(max_length=200, null=True, blank=True) 
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True) 
    
    def __str__(self):
        return self.name

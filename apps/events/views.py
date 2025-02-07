from django.shortcuts import render
from .models import Event, Judge
from django.utils import timezone
# Create your views here.
def events(request):
    event = Event.objects.get(id=1)
    judges = Judge.objects.filter(event=event)
    event.date = event.datetime.strftime('%d %b %Y')
    event.time = event.datetime.time().strftime('%I:%M %p')
    duration = event.duration.total_seconds() // 60
    hours = duration // 60
    minutes = duration % 60
    event.duration = f"{int(hours)} hours {int(minutes)} minutes"
    event.datetime = event.datetime.strftime('%Y-%m-%dT%H:%M:%SZ')
    
    # Format the duration as "X hours Y minutes"
    
    context = {
        'event': event,
        'judges': judges
    }
    
    return render(request, 'apps/events/event_detail.html', context)
    # return render(request, 'apps/events/index.html')


def base(request):
    return render(request, 'layouts/base.html')

def layout(request):
    return render(request, 'apps/events/event_page.html')
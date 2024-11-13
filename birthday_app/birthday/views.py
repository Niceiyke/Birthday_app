# views.py
import os
from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import functions
from django.conf import settings
from datetime import datetime
from .models import Worker, SideImage


def monthly_birthdays(request):
    # Get current month
    current_month = datetime.now().month 

    # Filter workers whose birthday is in the current month and order by the day of the month
    workers = Worker.objects.filter(birthday__month=current_month).order_by(functions.ExtractDay('birthday'))

    # Get all side images 
    slide_images = SideImage.objects.all()
    

    context = {
        'workers': workers,
        'slide_images': slide_images,
    }
    
    return render(request, 'birthdays/home.html', context)




def get_music_urls(request):
    music_dir = os.path.join(settings.MEDIA_ROOT, 'music')
    music_files = [f"{settings.MEDIA_URL}music/{file}" for file in os.listdir(music_dir) if file.endswith('.mp3')]
    return JsonResponse({'music_urls': music_files})


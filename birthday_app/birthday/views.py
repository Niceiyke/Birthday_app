# views.py

from django.shortcuts import render
from .models import Worker,SideImage


from django.shortcuts import render
from datetime import datetime
from .models import Worker, SideImage, AdminSettings
from django.db.models import functions

from django.shortcuts import render
from datetime import datetime
from .models import Worker, SideImage, AdminSettings

def monthly_birthdays(request):
    # Get current month
    current_month = datetime.now().month
    
    # Filter workers whose birthday is in the current month and order by the day of the month
    workers = Worker.objects.filter(birthday__month=current_month).order_by(functions.ExtractDay('birthday'))
    
    # Get all side images and admin settings
    slide_images = SideImage.objects.all()
    admin_settings = AdminSettings.objects.first()

    context = {
        'workers': workers,
        'slide_images': slide_images,
        'background_image': admin_settings.background_image if admin_settings else None,
        'default_music': admin_settings.get_random_music() if admin_settings else None,
    }
    
    return render(request, 'birthdays/home.html', context)


# views.py
from django.http import JsonResponse
from .models import Music  # Assuming you have a Music model with a `file` field for the music file

from django.http import JsonResponse
from django.conf import settings
import os

def get_music_urls(request):
    music_dir = os.path.join(settings.MEDIA_ROOT, 'music')
    music_files = [f"{settings.MEDIA_URL}music/{file}" for file in os.listdir(music_dir) if file.endswith('.mp3')]
    return JsonResponse({'music_urls': music_files})

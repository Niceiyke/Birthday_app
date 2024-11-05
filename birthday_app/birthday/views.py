# views.py

from django.shortcuts import render
from .models import Worker, AdminSettings


def monthly_birthdays(request):
    workers = Worker.objects.all()
    admin_settings = AdminSettings.objects.first()

    context = {
        'workers': workers,
        'background_image': admin_settings.background_image if admin_settings else None,
        'default_music': admin_settings.get_random_music() if admin_settings else None,
    }
    return render(request, 'birthdays/monthly_birthdays.html', context)



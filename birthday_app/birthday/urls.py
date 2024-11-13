from django.urls import path
from .views import monthly_birthdays,get_music_urls

urlpatterns =[
    path('',monthly_birthdays,name='monthly_birthdays'),
    path('get-music-urls/', get_music_urls, name='get_music_urls'),
]
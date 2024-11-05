# admin.py

from django.contrib import admin
from .models import Worker, AdminSettings, Music,SideImage

@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ('first_name',)

@admin.register(AdminSettings)
class AdminSettingsAdmin(admin.ModelAdmin):
    list_display = ('background_image',)
    filter_horizontal = ('background_music_files',)

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('title', 'file')

@admin.register(SideImage)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('title', 'file')

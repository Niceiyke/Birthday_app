# models.py

from django.db import models

class Worker(models.Model):
    first_name = models.CharField(max_length=100)
    last_name= models.CharField(max_length=100)
    email = models.EmailField(max_length=100,primary_key=True)
    birthday = models.DateField()
    department= models.CharField(max_length=50)
    picture = models.ImageField(upload_to='workers/')
    background_music = models.FileField(upload_to='music/', blank=True, null=True)
    

class AdminSettings(models.Model):
    background_image = models.ImageField(upload_to='backgrounds/', blank=True, null=True)
    background_music_files = models.ManyToManyField('Music', blank=True)

    def get_random_music(self):
        return self.background_music_files.order_by('?').first() if self.background_music_files.exists() else None

class Music(models.Model):
    file = models.FileField(upload_to='music/')
    title = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title or "Untitled Music"
    
class SideImage(models.Model):
    file = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title 


# serializers.py
from rest_framework import serializers
from birthday.models import Worker, AdminSettings, Music,SideImage

class WorkerSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(use_url=True)  # To include full URL

    class Meta:
        model = Worker
        fields = ['first_name', 'last_name','email', 'birthday', 'department', 'picture']


class MusicSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = Music
        fields = ['id', 'file', 'title']


class AdminSettingsSerializer(serializers.ModelSerializer):
    background_image = serializers.ImageField(use_url=True)
    background_music_files = MusicSerializer(many=True, read_only=True)
    random_music = serializers.SerializerMethodField()

    class Meta:
        model = AdminSettings
        fields = ['id', 'background_image', 'background_music_files', 'random_music']

    def get_random_music(self, obj):
        """Fetch a random music file from `background_music_files` if available."""
        music = obj.get_random_music()
        return MusicSerializer(music).data if music else None
    
class SideImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SideImage
        fields = ['id', 'file', 'title']

# urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('birthday/', include('birthday.urls')),  # Use a distinct path for birthday app
    path('api/', include('api.urls')),  # Configure api paths at /api/
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

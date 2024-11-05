# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkerViewSet, AdminSettingsViewSet, MusicViewSet, SideImageViewSet, UpdateWorkerPictureView

router = DefaultRouter()
router.register(r'workers', WorkerViewSet)
router.register(r'admin-settings', AdminSettingsViewSet)
router.register(r'music', MusicViewSet)
router.register(r'side-images', SideImageViewSet)  # Register the SideImage viewset

urlpatterns = [
    path('workers/update-picture/', UpdateWorkerPictureView.as_view(), name='update-worker-picture'),
    path('', include(router.urls)),  # Include router URLs here
    # Other URL patterns...
]

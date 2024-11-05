# views.py
from rest_framework import viewsets, status,views
from rest_framework.response import Response
from rest_framework.decorators import action
from birthday.models import Worker, AdminSettings, Music,SideImage
from .serializers import WorkerSerializer, AdminSettingsSerializer, MusicSerializer,SideImageSerializer
from datetime import date


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()  # Define a default queryset for Django's internal reference
    serializer_class = WorkerSerializer

    def get_queryset(self):
        today = date.today()
        current_month = today.month
        
        # Filter workers with birthday today
        queryset = Worker.objects.filter(birthday__day=today.day, birthday__month=today.month)
        
        # If no workers have birthdays today, return those with birthdays in the current month
        if not queryset.exists():
            queryset = Worker.objects.filter(birthday__month=current_month)
        
        return queryset
    
    def retrieve(self, request, email=None):
        try:
            worker = Worker.objects.get(email=email)
            serializer = self.get_serializer(worker)
            return Response(serializer.data)
        except Worker.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, email=None):
        try:
            worker = Worker.objects.get(email=email)
            serializer = self.get_serializer(worker, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Worker.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class AdminSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AdminSettings.objects.all()
    serializer_class = AdminSettingsSerializer


class MusicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class SideImageViewSet(viewsets.ModelViewSet):
    queryset = SideImage.objects.all()
    serializer_class = SideImageSerializer

class UpdateWorkerPictureView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        picture = request.FILES.get('picture')

        try:
            worker = Worker.objects.get(email=email)
            if picture:
                worker.picture = picture
                worker.save()
                return Response({'message': 'Worker picture updated successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No picture provided.'}, status=status.HTTP_400_BAD_REQUEST)
        except Worker.DoesNotExist:
            return Response({'error': 'Worker not found.'}, status=status.HTTP_404_NOT_FOUND)

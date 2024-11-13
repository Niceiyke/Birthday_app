from django import forms
from .models import Worker

class WorkerForm(forms.ModelForm):
    class Meta:
        model = Worker
        fields = ['name', 'position', 'sap', 'birthday', 'department', 'picture', 'gender', 'location', 'cader']

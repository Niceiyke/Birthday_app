from django.urls import path
from .views import monthly_birthdays 

urlpatterns =[
    path('birthdays/',monthly_birthdays,name='monthly_birthdays')
]
from django.urls import path
from .views import upload_file, process_link

urlpatterns = [
    path('upload/', upload_file, name="upload_file"), 
    path('process_link/', process_link, name="process_link"),
]

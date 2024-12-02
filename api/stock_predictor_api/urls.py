from django.contrib import admin
from django.urls import path
from . import views

# URL patterns for routing web requests
urlpatterns = [
    path('admin/', admin.site.urls),
    path("", views.index, name='index'),  # Homepage
    path('update/', views.update, name='update'),  # Update predictions
    path('prediction/<slug:symbol>', views.prediction, name='prediction'),  # Get prediction for specific stock
    path('get_data/', views.get_data, name='get_data'),  # Fetch S&P 500 stock data
    path('process_data/', views.process_data, name='process_data')  # Process downloaded data
]
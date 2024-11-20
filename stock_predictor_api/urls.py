from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",views.index,name='index'),
    path('update/',views.update, name='update'),
    path('prediction/<slug:symbol>',views.prediction, name='prediction'),
    path('get_data/',views.get_data, name='get_data'),
    path('process_data/',views.process_data, name='process_data')
]

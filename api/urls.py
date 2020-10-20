from django.urls import include, path
from rest_framework import routers
from . import views
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('messages/', views.MessageList.as_view()),
    path('messages/<int:pk>', views.MessageDetail.as_view()),
]

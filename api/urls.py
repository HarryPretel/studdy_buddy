from django.urls import include, path
from rest_framework import routers
from . import views
from .views import *

router = routers.DefaultRouter()
router.register(r'userprofiles', views.UserProfileViewSet)
router.register(r'course',views.CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('messages/', views.AllMessageList.as_view()),
    path('messages/sent/', views.SentMessageList.as_view()),
    path('messages/received/', views.ReceivedMessageList.as_view()),
    path('messages/<int:pk>', views.MessageDetail.as_view()),
    path('messages/send', views.SendMessage.as_view()),

    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    
]

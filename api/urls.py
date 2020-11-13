from django.urls import include, path
from rest_framework import routers
from . import views
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('userprofiles/', views.UserProfileView.as_view()),
    path('userprofiles/<int:pk>/', views.UserProfileDetailView.as_view()),

    path('courses/', views.CourseView.as_view()),
    path('courses/<int:pk>/', views.CourseDetailView.as_view()),
    path('courses/students/<int:pk>/', views.EnrolledDetailView().as_view()),


    path('messages/', views.AllMessageList.as_view()),
    path('messages/sent/', views.SentMessageList.as_view()),
    path('messages/received/', views.ReceivedMessageList.as_view()),
    path('messages/<int:pk>', views.MessageDetail.as_view()),
<<<<<<< HEAD
    #path('messages/send', views.SendMessage.as_view()),
    
    
    
=======



>>>>>>> 7de529dda9a71097014bb000a7c8c5b1e85cb63b
]

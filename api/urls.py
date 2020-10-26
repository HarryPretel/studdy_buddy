from django.urls import include, path
from rest_framework import routers
from . import views
from .views import *
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),

    path('messages/', views.AllMessageList.as_view()),
    path('messages/sent/', views.SentMessageList.as_view()),
    path('messages/received/', views.ReceivedMessageList.as_view()),
    path('messages/<int:pk>', views.MessageDetail.as_view()),
    path('messages/send', views.SendMessage.as_view()),

    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('token-auth/', obtain_jwt_token)
]

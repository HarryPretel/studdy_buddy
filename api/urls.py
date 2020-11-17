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

    path('messaging/user/<int:pk>', views.MessageView().as_view()),
    path('messaging/conversations/user/<int:pk>',
         views.ConversationListView().as_view()),
    path('messaging/conversations/user/<int:pka>/user2/<int:pkb>',
         views.TwoWayConvoView.as_view()),

    path('events/', views.EventView.as_view()),
    path('events/<int:pk>/', views.EventDetailView.as_view()),
    path('events/courses/<int:pk>/', views.EventforCourseView().as_view()),
    path('events/students/<int:pk>/', views.EventforStudentView().as_view()),
    path('events/organizers/<int:pk>/', views.EventforOrganizerView().as_view())
]

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import filters
# Create your views here.
from rest_framework import viewsets
from .serializers import *
from .models import *
from .permissions import *



@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserList(generics.ListCreateAPIView):
#    queryset = User.objects.all()
#    serializer_class = UserSerializer

class UserProfileView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        profile = UserProfile.objects.all()
        serializer = UserProfileSerializer(profile, many=True)
        return Response(serializer.data)


class UserProfileDetailView(APIView):
    #permission_classes = (permissions.AllowAny,)

    def get(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def get_object(self, pk):
        return UserProfile.objects.get(pk=pk)

    def patch(self, request, pk, format=None):
        profile_object = self.get_object(pk)
        serializer = UserProfileSerializer(
            profile_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Course.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ['department','number','name',]
    serializer_class = CourseSerializer

    # def get(self, request, format = None):
    #     course = Course.objects.all()
    #     serializer = CourseSerializer(course, many = True)
    #     return Response(serializer.data)
    
    # def post(self, request, format = None):
    #     serializer = CourseSerializer(data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        return Course.objects.get(pk=pk)

    def get(self, request, pk, format = None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    
    def patch(self, request, pk, format = None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format = None):
        course = self.get_object(pk)
        userpk = request.data['userpk']
        user_remove = User.objects.get(pk = userpk)
        updatedcourse = course.user.remove(user_remove)
        serializer = CourseSerializer(updatedcourse)
        return Response(serializer.data)
    

class EnrolledDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self,pk):
        return Course.objects.filter(user__pk = pk)
    
    def get(self, request, pk, format = None):
        course = self.get_object(pk).all()
        serializer = CourseSerializer(course, many = True)
        return Response(serializer.data)
    

class EventView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format = None):
        event = Event.objects.all()
        serializer = EventSerializer(event, many = True)
        return Response(serializer.data)
    
    def post(self, request, format = None):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.erros, status = status.HTTP_400_BAD_REQUEST)

class EventforCourseView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get_object(self,pk):
        return Event.objects.filter(course_focus__pk = pk)
    
    def get(self, request, pk, format = None):
        event = self.get_object(pk).all()
        serializer = EventSerializer(event, many = True)
        return Response(serializer.data)

class EventforStudentView(APIView):
    def get_object(self,pk):
        return Event.objects.filter(participants__pk = pk)
    
    def get(self, request, pk, format = None):
        event = self.get_object(pk).all()
        serializer = EventSerializer(event, many = True)
        return Response(serializer.data)


class AllMessageList(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return (
            self.request.user.sent_message.all() | self.request.user.received_message.all()
        ).order_by('-timestamp')


class SentMessageList(generics.ListAPIView):
    """
    List all snippets, or create a new snippet.
    """
    serializer_class = MessageSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):  # does nothing because this view is read-only
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.request.user.sent_message.all().order_by('-timestamp')


class MessageList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        messages = Message.objects.all()
        serializer = MessageSerializer(Message)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, statuus=status.HTTP_400_BAD_REQUEST)


"""
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
"""


class ReceivedMessageList(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return self.request.user.received_message.all().order_by('-timestamp')


class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    permission_classes = (permissions.AllowAny,)

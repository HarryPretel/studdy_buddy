from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
# Create your views here.
from rest_framework import viewsets
from .serializers import *
from .models import *
from .permissions import *

import collections


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
    permission_classes = (permissions.AllowAny,)

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


class CourseView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        return Course.objects.get(pk=pk)

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EnrolledDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        return Course.objects.filter(user__pk=pk)

    def get(self, request, pk, format=None):
        course = self.get_object(pk).all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)


class MessageView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        return Message.objects.filter(sender__pk=pk) | Message.objects.filter(receivers__pk=pk)

    def get(self, request, pk, format=None):
        messages = self.get_object(pk).all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_tuple_key(self, message):
        group = [message.sender.username]
        receivers = message.receivers.all()
        for r in receivers:
            group.append(r.username)
        return tuple(sorted(group))

    def get(self, request, pk, format=None):
        messages = (Message.objects.filter(
            sender__pk=pk) | Message.objects.filter(receivers__pk=pk)).order_by('-timestamp')
        ret = []
        unique_convos = set()
        for m in messages:
            key = self.get_tuple_key(m)
            if key not in unique_convos:
                unique_convos.add(key)
                ret.append(m)
        serializer = MessageSerializer(ret, many=True)
        return Response(serializer.data)

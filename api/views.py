from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import *
from .models import *
from .permissions import *

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    questset = User.objects.all()
    serializer_class = UserSerializer


class MessageList(generics.ListCreateAPIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

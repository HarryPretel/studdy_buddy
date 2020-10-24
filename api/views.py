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


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    questset = User.objects.all()
    serializer_class = UserSerializer


class AllMessageList(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [
        IsOwnerOrNoAccess
    ]

    def get_queryset(self):
        return self.request.user.sent_message.all() | self.request.user.received_message.all()


class SentMessageList(generics.ListAPIView):
    """
    List all snippets, or create a new snippet.
    """
    serializer_class = MessageSerializer
    permission_classes = [
        IsOwnerOrNoAccess
    ]

    def perform_create(self, serializer):  # does nothing because this view is read-only
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.request.user.sent_message.all()


class ReceivedMessageList(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [
        IsOwnerOrNoAccess
    ]

    def get_queryset(self):
        return self.request.user.received_message.all()


class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    permission_classes = [
        IsOwnerOrNoAccess
    ]

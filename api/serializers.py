from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    messages = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Message.objects.all())

    class Meta:
        model = User
        fields = ('username', 'pk', 'first_name', 'last_name', 'email',
                  'password', 'group', 'last_login', 'date_joined', 'messages')


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ('sender', 'receiver', 'content', 'timestamp', 'pk')
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('username', 'pk', 'first_name', 'last_name', 'email',
        #           'password', 'last_login', 'date_joined')
        fields = ('username', 'pk', 'first_name', 'last_name', 'email','password')

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password','first_name','last_name','email','pk')

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(required = True)

    class Meta:
        model = UserProfile
        fields = ('pk','studytime','studylocation','user')

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only = True, many = True)
    
    class Meta:
        model = Course
        fields = ('pk','department','number','name','user')

# class StudyTimeSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = StudyTime
#         fields = ('pk','time')

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ('sender', 'receivers', 'content', 'timestamp', 'pk')

from rest_framework import fields, serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
import collections


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('username', 'pk', 'first_name', 'last_name', 'email',
        #           'password', 'last_login', 'date_joined')
        fields = ('username', 'pk', 'first_name',
                  'last_name', 'email', 'password')
        extra_kwargs = {
            'username': {'validators': []},
        }


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
        fields = ('token', 'username', 'password',
                  'first_name', 'last_name', 'email', 'pk')


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(required=True)
    studytime = fields.MultipleChoiceField(choices=STUDY_TIMES)

    class Meta:
        model = UserProfile
        fields = ('pk', 'studytime', 'studylocation', 'user')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(many=True)

    class Meta:
        model = Course
        fields = ('pk', 'department', 'number', 'name', 'user')

    def update(self, validated_data):
        submitted_user = validated_data.pop('user')
        print(submitted_user)
        if submitted_user:
            for student in submitted_user:
                name = student["username"]
                user_instance = User.objects.get(username=name)
                instance.user.add(user_instance)
        instance.save()
        return instance

# class StudyTimeSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = StudyTime
#         fields = ('pk','time')


class EventSerializer(serializers.HyperlinkedModelSerializer):
    organizer = UserSerializer(many=False,read_only=True)
    course_focus = CourseSerializer(many=False, read_only=True)
    participants = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('pk', 'course_focus', 'organizer', 'time_organized', 'start', 'end',
                  'title', 'size_limit', 'link', 'description', 'status', 'participants')
        #fields = '__all__'

    def create(self, validated_data):
        course = Course.objects.get(pk=validated_data.pop('course_focus'))
        organizer = User.objects.get(pk = validated_data.pop('organizer'))
        
        # time_organized = validated_data.get('time_organized')
        # start = validated_data.get('start')
        # end = validated_data.get('end')
        # title = validated_data.get('title')
        # size_limit = validated_data.get('size_limit')
        # link = validated_data.get('link')
        # description = validated_data.get('description')
        # status = validated_data.get('status')
        # instance = Event.objects.create(time_organized=time_organized,start=start,end=end,title=title,size_limit=size_limit,link=link,description=description,status=status, course_focus=course, organizer=organizer, participants=participants)
        instance = Event.objects.create(**validated_data)
        instance.participants.add(organizer)
        instance.organizer = organizer
        instance.course_focus = course
        return instance

    def update(self, instance, validated_data):
        participant = validated_data.pop('participants')
        print(participant)
        if participant:
            for student in participant:
                name = student["username"]
                user_instance = User.objects.get(username=name)
                instance.participants.add(user_instance)
        instance.save()
        return instance


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')
    receivers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Message
        fields = ('sender', 'receivers', 'content', 'timestamp', 'pk')

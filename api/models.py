from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

# School model
class School(models.Model):
    name = models.CharField(max_length=25)
    extension = models.CharField(max_length=25)
    date_joined = models.DateTimeField()

    def __str__(self):
        return self.extension

    def save(self, *args, **kwargs):
        self.date_joined = datetime.datetime.now()
        super(School, self).save(*args, **kwargs)

# Department sub of School
class Department(models.Model):
    name = models.CharField(max_length=25)
    school = models.ForeignKey(
        School, related_name='departments', on_delete=models.CASCADE)
    code = models.CharField(max_length=5)
    date_joined = models.DateTimeField()

    def __str__(self):
        return self.name + ' at ' + self.school.name

    def save(self, *args, **kwargs):
        self.date_joined = datetime.datetime.now()
        super(Department, self).save(*args, **kwargs)

# Class is sub of department
class Class(models.Model):
    number = models.CharField(max_length=3)
    department = models.ForeignKey(
        Department, related_name='classes', on_delete=models.CASCADE
    )
    date_joined = models.DateTimeField()

    def __str__(self):
        return self.department.code + '' + self.number

    def save(self, *args, **kwargs):
        self.date_joined = datetime.datetime.now()
        super(Class, self).save(*args, **kwargs)

#Profile is sub of User
class Profile(models.Model):
    user = models.ForeignKey(
        User, related_name='profile', on_delete=models.CASCADE)
    classes = models.ManyToManyField(Class, related_name='students')
    departments = models.ManyToManyField(Department, related_name='students')
    schools = models.ManyToManyField(School, related_name='students')

    def __str__(self):
        return self.user.username

# Message is sub of USer
class Message(models.Model):
    sender = models.ForeignKey(
        User, related_name='sent_message', on_delete=models.CASCADE
    )
    receivers = models.ManyToManyField(User, related_name='received_message')
    message_type = models.CharField(max_length=10)
    content = models.CharField(max_length=140)
    timestamp = models.DateTimeField()

    def __str__(self):
        return 'from: ' + self.sender.username + ' message: ' + self.content

    def save(self, *args, **kwargs):
        self.timestamp = datetime.datetime.now()
        super(Message, self).save(*args, **kwargs)

# Event is sub of Class and User
class Event(models.Model):
    class_focus = models.ForeignKey(
        Class, related_name='events', on_delete=models.CASCADE)
    organizer = models.ForeignKey(
        User, related_name='organized_events', on_delete=models.CASCADE)
    time_organized = models.DateTimeField()

    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=50)
    size_limit = models.IntegerField()
    link = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    status = models.IntegerField()

    def save(self, *args, **kwargs):
        self.time_organized = datetime.datetime.now()
        super(Event, self).save(*args, **kwargs)

# Attendance is sub of User and Event
class Attendance(models.Model):
    user = models.ForeignKey(
        User, related_name='attendance', on_delete=models.CASCADE)
    event = models.ForeignKey(
        Event, related_name='attendance', on_delete=models.CASCADE)

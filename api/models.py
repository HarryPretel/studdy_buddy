from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.



class Course(models.Model):
    department = models.CharField(max_length=5)
    number = models.CharField(max_length=3)

    date_joined = models.DateTimeField()

    def __str__(self):
        return self.department + '' + self.number

    def save(self, *args, **kwargs):
        self.date_joined = datetime.datetime.now()
        super(Course, self).save(*args, **kwargs)



# class StudyTime(models.Model):
#     STUDY_TIMES = (
#         ('m', 'morning'),
#         ('a', 'afternoon'),
#         ('e', 'evening'),
#         ('n', 'night'),

#     )
#     time = models.CharField(max_length=1, choices=STUDY_TIMES)

#Profile is sub of User
class UserProfile(models.Model):
    # user = models.ForeignKey(
    #     User, related_name='profile', on_delete=models.CASCADE)
    STUDY_TIMES = (
        ('m', 'morning'),
        ('a', 'afternoon'),
        ('e', 'evening'),
        ('n', 'night'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #studytime = models.ManyToManyField(StudyTime, related_name='students')
    studytime = models.MultipleChoiceField(max_length=1,choices=STUDY_TIMES,default='e')
    studylocation = models.CharField(max_length=15)
    courses = models.ManyToManyField(Course, related_name='students')

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
    # files in MEDIA_ROOT/uploads/year/m/d
    # attachment = models.FileField(upload_to='uploads/%Y/%m/%d/')
    timestamp = models.DateTimeField()

    def __str__(self):
        return 'from: ' + self.sender.username + ' message: ' + self.content

    def save(self, *args, **kwargs):
        self.timestamp = datetime.datetime.now()
        super(Message, self).save(*args, **kwargs)

# Event is sub of Class and User
class Event(models.Model):
    course_focus = models.ForeignKey(
        Course, related_name='events', on_delete=models.CASCADE)
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

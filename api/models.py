from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.


class Message(models.Model):
    sender = models.ForeignKey(
        'auth.User', related_name='message', on_delete=models.CASCADE)
    receiver = models.CharField(max_length=10)
    message_type = models.CharField(max_length=10)
    content = models.CharField(max_length=140)
    timestamp = models.DateTimeField()

    def __str__(self):
        return str(self.sender, self.content)

    def save(self, *args, **kwargs):
        self.timestamp = datetime.datetime.now()
        super(Message, self).save(*args, **kwargs)

from django.test import TestCase
from .models import Message
from django.contrib.auth.models import User


default_user = {
    'username': 'test_user',
    'first_name': 'test_fn',
    'last_name': 'test_ln',
    'email': 'test@studdybuddy.com',
    'password': 'testtesttest',
}


class UserModelTests(TestCase):

    def setUp(self):
        User.objects.create(username=default_user['username'], first_name=default_user['first_name'],
                            last_name=default_user['last_name'], email=default_user['email'], password=default_user['password'])

    def test_message_create(self):
        """Make sure that you can create Users"""
        temp = User.objects.get(username=default_user['username'])
        self.assertEqual(temp.first_name, default_user['first_name'])

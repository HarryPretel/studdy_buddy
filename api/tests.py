from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from .models import Message

default_user = {
    'username': 'test_user',
    'first_name': 'test_fn',
    'last_name': 'test_ln',
    'email': 'test@studdybuddy.com',
    'password': 'testtesttest',
}


class UserModelTests(TestCase):

    def test_message_create(self):
        User.objects.create(username=default_user['username'], first_name=default_user['first_name'],
                            last_name=default_user['last_name'], email=default_user['email'], password=default_user['password'])
        temp = User.objects.get(username=default_user['username'])
        self.assertEqual(temp.first_name, default_user['first_name'])


class MessageModelTests(TestCase):
    def setUp(self):
        print('yoyo')


class MessageViewTests(TestCase):
    def test_ex1(self):
        client = APIClient()
        response = client.login(username='harrisonp', password='admin')
        print('1', response)
        response = client.get('/api/messages/', format='json')
        print('2', response)
        #print(client.get('/api/messages/all', format='json'))
        client.logout()

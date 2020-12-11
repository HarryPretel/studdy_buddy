# studdy_buddy
A web app for creating study groups and making friends.

# running:
## repo setup
```
git clone https://github.com/HarryPretel/studdy_buddy.git
```
## server setup
run each of the following commands in the repo you just downloaded
### backend
```
python3 -m pip install django
python3 -m pip install django-rest-framework
python3 -m pip install django-multiselectfield
python3 manage.py runserver
```
### frontend
```
cd frontend
yarn
yarn start
```
## running our app
Go to localhost:3000 in your chrome browser to view our website

# backend documentation
## messages
### /api/messages/
GET returns all messages to/from the current user in reverse chronological order.

### /api/messages/sent/
GET returns all messages sent by the current user in reverse chronological order.

### /api/messages/received/
GET returns all messages sent to the current user in reverse chronological order.

### /api/messages/[pk]
GET returns a detailed view of the message specified by pk.

### /api/messages/send
POST with a body in the form of:
```
{
    "receivers": [],
    "content": "",
    "timestamp": null
}
```
will send a message.

### /api/users/
GET will return all of the current users

### /api/users/[pk]
GET will return a detailed view of the user specified by pk.




# troubleshooting
### problems w db
```
rm -f db.sqlite3
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
```

### running backend server
```
python3 manage.py runserver
```

# studdy_buddy
A web app for creating study groups and making friends.

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
### running tests
```
python3 manage.py test
```
### running backend server
```
python3 manage.py runserver
```

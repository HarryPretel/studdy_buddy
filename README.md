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

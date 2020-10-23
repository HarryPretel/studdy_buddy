# studdy_buddy
A web app for creating study groups and making friends.

## troubleshooting
### problems w db
```
rm -f db.sqlite3
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
```

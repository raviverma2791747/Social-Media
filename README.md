# A social networking site made using React,Django and bootstrap

## Instructions to run
1. open terminal in root directory
2. run command cd website
4. run command npm run build
5. run command cd ..
6. run command python manage.py runserver

```
cd website
npm run build
cd ..
python manage.py runserver
```

## API
Send all POST request with Headers
X-CSRFToken : csrfcookie value

### GetCSRFToken
localhost/api/getcsrf
accepts GET request with no data

### Register user
localhost/api/account/register
accepts POST request with json data
```
{
   "username" : "myusername",
   "password" : "mypassword",
   "re_password" : "mypassword",
   "email" : "myemail",
   "first_name" : "myfirst",
   "last_name" : "mylast"
} 
```

### Login user
localhost/api/account/login
accepts POST request with json data
```
{
   "username" : "myusername",
   "password" : "mypassword",
}
```

### IsAuthenticated user
localhost/api/account/isauthenticated
accepts GET request with no data

### Logout user
localhost/api/account/logout
accepts POST request with no json data

### Delete user
localhost/api/account/delete
accepts DELETE request with no jsond data

### Current User
localhost/api/profile/current_user
accepts GET request
```
{
 'status' : 'success',
 'message' : '',
 'data' : {
   'username' : 'myusername'
 }
}
```

| API | Types | Response |
| --- | ----- | -------- |
|/api/account/register | POST | -- |

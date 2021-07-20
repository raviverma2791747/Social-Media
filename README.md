# A social networking site made using React,Django and bootstrap

## API

## Register user
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

localhost/api/account/logout


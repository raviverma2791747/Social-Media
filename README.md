<div align="center" id="top"> 
  <!--img src="1.png" alt="Code" /-->
  &#xa0;

</div>

<h1 align="center">Social Media App</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/raviverma2791747/Social-Media?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/raviverma2791747/Social-Media?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/raviverma2791747/Social-Media?color=56BEB8">

  <img alt="Github issues" src="https://img.shields.io/github/issues/raviverma2791747/Social-Media?color=56BEB8" /> 

  <img alt="Github forks" src="https://img.shields.io/github/forks/raviverma2791747/Social-Media?color=56BEB8" />

  <img alt="Github stars" src="https://img.shields.io/github/stars/raviverma2791747/Social-Media?color=56BEB8" />
</p>

<!-- Status -->

<h4 align="center"> 
	🚧 🚀 Django based Social Media App using Django Rest and React Framework. 🚧
</h4> 

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#man_office_worker-contributing">Contributing</a> &#xa0; | &#xa0;
  <a href="https://github.com/muskaan712" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

This is a simple social media application. The user can register,login,post,comment and follow on this application.

## :rocket: Technologies ##

The following tools were used in this project:

- [Python](https://downloads.python.org/)
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [HTML]
- [CSS]
- [Heroku for Deployment]

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Python 3.8](https://downloads.python.org/), and the above Libraries installed.

# :man_office_worker: Contributing ##
For major changes, please open an issue first to discuss what you would like to change.



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

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/raviverma2791747" target="_blank">Ravi Verma</a>

&#xa0;

<a href="#top">Back to top</a>

from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile


# Create your views here.
def index(request):
    return HttpResponse('''
    <div>localhost:8000/api/account/logout</div>
    <div>localhost:8000/api/account/login</div>
    <div>localhost:8000/api/account/register</div>
    <div>localhost:8000/api/account/isauthenticated</div>
    ''')

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        isAuthenticated = request.user.is_authenticated

        if isAuthenticated:
            return Response({'status': 'success', "message" : "User is authenticated!"})
        else:
            return Response({'status': 'failed' , "message" : "User failed authentication!"})


@method_decorator(csrf_protect, name='dispatch')
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        try:
            username = data['username']
            password = data['password']
            re_password = data['re_password']
            first_name = data['first_name']
            last_name = data['last_name']
            email = data['email']
        except:
            return Response({"status" : "failed" , "message" : "One or more input field is missing"})

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({ "status" : "failed" ,'message': 'Username already exists'})
                else:
                    if len(password) < 8:
                        return Response({  "status" : "failed" , 'message': 'Password must be atleast 8 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user.save()
                        user = User.objects.get(id=user.id)
                        user_profile = UserProfile(user=user, first_name=first_name, last_name=last_name, email=email)
                        user_profile.save()
                        return Response({'status': 'success', "message" : "User created successfully!"})
            else:
                return Response({ "status" : "failed" , 'message': 'Passwords do not match'})
        except:
            return ({'status' : "failed" , "message" : "Something went wrong on our side!"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        try:
           username = data['username']
           password = data['password']
        except:
            return Response({"status" : "failed" ,  "message" : "Username or Password cannot be empty!"})

        try:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return Response({'status': 'success' , "message" : "User Logged in successfully!" })
            else:
                return Response({'status': 'failed' ,  "message" : "Invalid Username or Password!"})
        except:
            return Response({"status" : "failed" , "message" : "Something went wrong on our side!"})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'status': 'success'})
        except:
            return Response({'status': 'failed'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'status': 'success' , "message" : "CSRF Cookie set"})


class DeleteAccountView(APIView):
    def delete(self,request,format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return  Response({'status': 'success' , "message" : "Account deleted successfully!"})
        except:
            return Response({'status' : 'failed' , "message" : "Something went wrong!"})

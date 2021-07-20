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
            return Response({'status': 'success'})
        else:
            return Response({'status': 'failed'})


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

            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 8:
                        return Response({'error': 'Password must be atleast 8 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user.save()
                        user = User.objects.get(id=user.id)
                        user_profile = UserProfile(user=user, first_name=first_name, last_name=last_name, email=email)
                        user_profile.save()
                        return Response({'status': 'success'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return ({'status' : "error"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return Response({'status': 'success'})
        else:
            return Response({'status': 'failed'})


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
        return Response({'success': 'CSRF Cookie Set'})


class DeleteAccountView(APIView):
    def delete(self,request,format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return  Response({'status': 'success' })
        except:
            return Response({'status' : 'error'})

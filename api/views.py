import datetime

from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from PIL import Image

from .models import UserProfile, Post, Follow, PostLike, PostComment,Setting,Activity
from .serializers import UserProfileSerializer, PostSerializer, CommentSerializer,FeedSerializer,SettingSerializer,ActivitySerializer,UserDetailsSerializer


# Create your views here.
def index(request):
    return HttpResponse('''
    <div>localhost:8000/api/account/logout</div>
    <div>localhost:8000/api/account/login</div>
    <div>localhost:8000/api/account/register</div>
    <div>localhost:8000/api/account/isauthenticated</div>
    ''')
#Utility
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'status': 'success' , "message" : "CSRF Cookie set!"})

#Account
@method_decorator(csrf_protect, name='dispatch')
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        try:
            if 'username' not in data :
                return Response({"status" : "failed" , "message" : "Username cannot be empty!"})
            elif len(data['username']) < 4 and len(data['username']) > 30:
                return Response({"status": "failed", "message": "Username cannot be less than 4 characters!"})
            else:
                username = data['username']

            if 'first_name' not in data:
                return Response({"status": "failed", "message": "First Name cannot be empty!"})
            elif len(data['first_name']) < 4 and len(data['first_name']) > 30:
                    return Response({"status": "failed", "message": "First name cannot be less than 4 characters!"})
            else:
                first_name = data['first_name']

            if 'last_name' not in data:
                return Response({"status": "failed", "message": "Last Name cannot be empty!"})
            elif len(data['last_name']) < 4 and len(data['last_name']) > 30:
                return Response({"status": "failed", "message": "Last name cannot be less than 4 characters!"})
            else:
                last_name = data['last_name']

            if data['gender'] is not None and data['gender'] not in ['U', 'M', 'F', 'O']:
                return Response({"status": "failed", "message": "Invalid gender!"})
            else:
                gender = data['gender']

            if data['dob'] is not None and  data['dob']:
                dob_year = int(data['dob'].split('-')[0])
                curr_year = datetime.datetime.now().year
                if dob_year > 0 and curr_year - dob_year >=  18:
                    dob = data['dob']
                else:
                    return Response({"status": "failed", "message": "Age must be greater than 18!"})
            else:
                dob = None

            if data['contact'] is not None and data['contact']:
                if len(data['contact']) <= 10 and len(data['contact']) > 9 :
                    contact = data['contact']
                else:
                    return Response({"status": "failed", "message": "Contact must be 10 digits longs"})
            else:
                contact = None

            if 'email' not in data:
                return Response({"status": "failed", "message": "Email cannot be empty!"})
            elif len(data['email']) < 3 or len(data['email']) > 254:
                return  Response({'status' : 'failed', 'message' : 'Email should be atleast 3 and max 254 characters long!'})
            else:
                email = data['email']

            if 'password' not in data:
                return Response({"status" : "failed" , "message" : "Password cannot be empty!"})
            elif len(data['password']) < 8:
                return Response({"status": "failed", "message": "Password cannot be less than 8 characters!"})
            else:
                password = data['password']

            if 're_password' not in data:
                return Response({"status": "failed", "message": "Confirmation Password cannot be empty!"})
            elif len(data['re_password']) < 8:
                return Response({"status": "failed", "message": "Confrimation Password cannot be less than 8 characters!"})
            else:
                re_password = data['re_password']
        except:
            return Response({"status" : "failed" , "message" : "One or more input field is missing!"})

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
                        user_profile = UserProfile(user=user, first_name=first_name, last_name=last_name, email=email,gender=gender,dob=dob,contact=contact)
                        user_profile.save()
                        return Response({'status': 'success', "message" : "User created successfully!"})
            else:
               return Response({ "status" : "failed" , 'message': 'Passwords do not match'})
        except:
            if User.objects.filter(username=username).exists():
                User.objects.filter(username=username).delete()
                if UserProfile.objects.filter(user=User.objects.filter(username=username)).exists():
                    UserProfile.objects.filter(user=User.objects.filter(username=username)).delete()
            return Response({'status' : "failed" , "message" : "Something went wrong on our side!"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        try:
            data = self.request.data
            if 'username' not in data:
                return Response({'status' : 'failed' , 'message' : 'Username cannot be empty!'})
            if 'password' not in data:
                return Response({"status" : "failed" ,  "message" : "Password cannot be empty!"})
            username = data['username']
            password = data['password']
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
            return Response({'status': 'success', 'message' : 'Logged out successfully!'})
        except:
            return Response({'status': 'failed','message' : 'Something went wrong on our side!'})

@method_decorator(ensure_csrf_cookie,name='dispatch')
class DeleteAccountView(APIView):
    def delete(self,request,format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return  Response({'status': 'success' , "message" : "Account deleted successfully!"})
        except:
            return Response({'status' : 'failed' , "message" : "Something went wrong!"})


@method_decorator(csrf_protect,name='dispatch')
class UpdateAccountView(APIView):
    def put(self,request,format=None):
        if request.user.is_authenticated:
            data = request.data
            if 'password' in data and 're_password' in data:
                password = data['password']
                re_password = data['re_password']
                if password == re_password:
                    user = User.objects.get(id=request.user.id)
                    user.set_password(password)
                    user.save()
                    return Response({'status' : 'success' , 'message'  : 'Password changed successfully!'})
                else:
                    return Response({'status' : 'failed','message' : 'Confirmation password donot match!'})
            else:
                return Response({'status' : 'failed' ,'message'  : 'One or more input field is missing!'})
        else:
            return Response({'status':'failed' , 'message' : 'Unauthorized access!'})

@method_decorator(csrf_protect, name='dispatch')
class IsAuthenticatedAccountView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        isAuthenticated = request.user.is_authenticated

        if isAuthenticated:
            return Response({'status': 'success', "message" : "User is authenticated!", 'data' : {'username' : request.user.username}})
        else:
            return Response({'status': 'failed' , "message" : "User failed authentication!"})


#profile
@method_decorator(csrf_protect,name='dispatch')
class ProfileView(APIView):
    def get(self,request,username):
        if request.user.is_authenticated:
            if User.objects.filter(username=username).exists():
                try:
                    user =  User.objects.get(username=username)
                    userProfile = UserProfile.objects.get(user=user)
                    userProfileSerialize =  UserProfileSerializer(userProfile)
                except:
                    return  Response({"status" : "failed" , "message" : "Internal Server Error"})
            else:
               return Response({'status' : 'failed' , 'message' : "User doesn't exists"})
            try:
                userProfileData = userProfileSerialize.data
            except:
                return Response({"status": "failed", "message": "Internal Server Error"})
            if user == request.user:
                userProfileData['current_user'] = True
            else:
                userProfileData['current_user'] = False
                if Follow.objects.filter(follower=request.user,followee=User.objects.get(username=username)).exists():
                    userProfileData['current_user_following'] = True
                else:
                    userProfileData['current_user_following'] = False
            response = {"status" : "success" , "message" : "UserProfile data!" , "data" : userProfileData  }
            return Response(response)
        else:
            return Response({'status' : 'failed' , 'message' : 'Unauthorized access!'})

@method_decorator(csrf_protect,name='dispatch')
class CurrentUser(APIView):
    def get(self, request):
        if self.request.user.is_authenticated:
            try:
                user = self.request.user
                userProfile = UserProfile.objects.get(user=user)
                userProfileSerialize = UserProfileSerializer(userProfile)
            except:
               return Response({"status": "failed", "message": "Internal Server Error!"})
        else:
            return Response({'status': 'failed', 'message': "User doesn't exists"})
        try:
            userProfileData = userProfileSerialize.data
        except:
            return Response({"status": "failed", "message": "Internal Server Error"})
        userProfileData['current_user'] = True
        userProfileData['current_user_following'] = False
        response = {"status": "success", "message": "UserProfile data!", "data": userProfileData}
        return Response(response)

@method_decorator(csrf_protect,name='dispatch')
class UpdateProfileView(APIView):
    def post(self,request,format=None):
        try:
            if request.user.is_authenticated:
                data = request.data
                if data:
                    userProfile =  UserProfile.objects.get(user=request.user)
                    if 'first_name' in data:
                        if len(data['first_name'])  >= 4 and len(data['first_name']) <= 30:
                            userProfile.first_name = data['first_name']
                        else:
                            return Response({'status':'failed','message':'First name cannot be less than 4 characters!'})
                    if 'last_name' in data:
                        if len(data['last_name']) >= 4:
                            userProfile.last_name = data['last_name']
                        else:
                            return Response(
                                {'status': 'failed', 'message': 'Last name cannot be less than 4 characters!'})
                    if 'email' in data:
                        if len(data['email']) >=  3:
                            userProfile.email = data['email']
                        else:
                            return  Response({'status' : 'failed' , 'message' : 'Inavlid email !'})

                    if 'dob' in data:
                        dob_year = int(data['dob'].split('-')[0])
                        curr_year = datetime.datetime.now().year
                        if dob_year > 0 and curr_year - dob_year >= 18:
                            userProfile.dob = data['dob']
                        else:
                            return Response({"status": "failed", "message": "Age must be greater than 18!"})

                    if 'contact' in data:
                        if len(data['contact']) <= 10 and len(data['contact']) > 9:
                            userProfile.contact = int(data['contact'])
                        else:
                            return Response({"status": "failed", "message": "Contact must be 10 digits longs"})
                    if 'gender' in data:
                        if data['gender'] == 'Male':
                            userProfile.gender = 'M'
                        elif data['gender'] == 'Female':
                            userProfile.gender = 'F'
                        elif data['gender'] == 'Other':
                            userProfile.gender = 'O'
                        else:
                            return  Response({'status':'failed','message':'Invalid gender!'})
                    if 'desc' in data:
                        if len(data['desc']) <= 500:
                            userProfile.desc = data['desc']
                        else:
                            return  Response({'status' : 'failed','message' : 'Description Maximum length is 500'})

                    if 'profile_img' in request.FILES:
                        if request.FILES['profile_img'].size <= 15000000:
                            profile_img = Image.open(request.FILES['profile_img'])
                            width,height = profile_img.size
                            if width <= 170 and height <= 170:
                                userProfile.profile_img = request.FILES['profile_img']
                            else:
                                return  Response({'status':'failed','message':'Profile image dimesion should be 170x170!'})
                        else:
                            return  Response({'status' : 'failed','message' : 'Profile Image size cannot be greater than 5 Mb'})

                    if 'profile_banner' in request.FILES:
                        if request.FILES['profile_banner'].size <= 15000000:
                            profile_img = Image.open(request.FILES['profile_banner'])
                            width, height = profile_img.size
                            if width <= 1600 and height <= 500:
                                userProfile.profile_banner = request.FILES['profile_banner']
                            else:
                                return Response(
                                    {'status': 'failed', 'message': 'Profile banner dimesion should be 1600x500!'})
                        else:
                            return Response(
                                {'status': 'failed', 'message': 'Profile Image size cannot be greater than 5 Mb'})

                    userProfile.save()
                    return Response({'status': 'success', 'message' : 'Profile updated successfully!'})
                else:
                    return Response({'status' : 'failed' , 'message' : 'One or more Input field is empty!'})
            else:
                return Response({'status' : 'failed' , 'message' : 'Unauthorized access!'})
        except:
            return Response({'status' : 'failed' ,  'message' : 'Internal server error!'})

@method_decorator(csrf_protect,name='dispatch')
class CreatePostView(APIView):
    def post(self,request,format=None):
        try:
            user = request.user
            content = request.data['content']
            _type= 'text'
            image=None
            video=None
            if 'file' in request.FILES:
                if request.FILES['file'].size <= 524288000:
                    fileType = self.getType(request.FILES['file'].name)
                    if fileType == 'image':
                        _type = fileType
                        image = request.FILES['file']
                    elif fileType == 'video':
                        _type = fileType
                        video = request.FILES['file']
                    else:
                        return Response({'status': 'failed', 'message': 'Invalid file type!'})
                else:
                    return  Response({'status': 'failed', 'message': 'File size limit 500 MB exceeded!'})
        except:
            return Response({'status': 'failed', 'message': 'Internal Server Error !'})
        try:
            if not content and video == None and image == None :
                return Response({'status': 'failed', 'message': 'One or more inputs are empty!'})
            else:
                post = Post(user=user,content=content,type=_type,image=image,video=video)
                post.save()
                activity = Activity(user=user,type=Activity.TYPE[0][0],post=post)
                activity.save()
                return Response({'status': 'success', 'message': 'Post created successfully !'})
        except:
            return Response({'status': 'failed', 'message': 'Internal Server error !'})

    def getType(self,filename):
        filExtension = filename.split('.')[-1]
        validExtension = {
            'png' : 'image',
            'jpg' : 'image',
            'jpeg' : 'image',
            'mp4' : 'video',
            'avi' : 'video',
            'wmv' : 'video',
            'ogg' : 'video',
            'webm' : 'video',
            'mov' : 'video',
        }
        if filExtension not in validExtension:
            return 'invalid'
        else:
            return validExtension[filExtension]

@method_decorator(csrf_protect,name='dispatch')
class DeletePostView(APIView):
    def delete(self,request,format=None):
        if request.user.is_authenticated:
            data = request.data
            if 'post_id' in data:
                post_id = data['post_id']
                if Post.objects.filter(id=post_id).exists():
                    post = Post.objects.get(id=post_id)
                    if post.user.username == request.user.username:
                        post.delete()
                        return Response({'status': 'success', 'message': 'Post deleted successfully!'})
                    else:
                        return Response({'status': 'failed', 'message': 'Cannot delete someone else\'s post!'})
                else:
                    return Response({'status': 'failed', 'message': 'Post doesn\'t exist '})
            else:
                return Response({'status': 'failed', 'message': 'Input field is empty!'})
        else:
            return Response({'status': 'failed', 'message': 'Unauhorized access!'})


@method_decorator(csrf_protect,name='dispatch')
class UpdatePostView(APIView):
    def put(self,request,format=None):
        if request.user.is_authenticated:
            data = request.data
            if 'post_id' in data:
                post_id = data['post_id']
                if Post.objects.filter(id=post_id).exists():
                    post = Post.objects.get(id=post_id)
                    if request.user.username == post.user.username:
                        _type = 'text'
                        content=None
                        image=None
                        video=None
                        if 'content' in data:
                            content = data['content']

                        if 'file' in request.FILES:
                            if request.FILES['file'].size <= 524288000:
                                fileType =  self.getType(request.FILES['file'].name)
                                if fileType == 'image':
                                    _type=fileType
                                    image = request.FILES['file']
                                elif fileType == 'video':
                                    _type=fileType
                                    video = request.FILES['file']
                                else:
                                    return Response({'status': 'failed', 'message': 'Invalid file!'})
                                if content is not  None:
                                    post.content = content

                                if _type == 'image':
                                    post.image = image
                                elif _type == 'video':
                                    post.video = video
                            else:
                                return  Response({'status': 'failed', 'message': 'File size limit 500 MB exceeded!'})
                        post.save()
                        return Response({'status': 'success', 'message': 'Post update successfully!'})
                    else:
                        return Response({'status': 'failed', 'messsage': 'Can\'t update the post!'})
                else:
                    return Response({'status' : 'failed' , 'messsage' : 'Post doesn\'t exists'})
            else:
                return Response({'status' : 'failed' , 'messsage' : 'Input field is empty!'})
        else:
            return Response({'status': 'failed', 'message': 'Unauthorized access!'})

    def getType(self, filename):
        filExtension = filename.split('.')[-1]
        validExtension = {
            'png': 'image',
            'jpg': 'image',
            'jpeg': 'image',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'ogg': 'video',
            'webm': 'video',
            'mov': 'video',
        }
        if filExtension not in validExtension:
            return 'invalid'
        else:
            return validExtension[filExtension]

@method_decorator(csrf_protect,name='dispatch')
class PostView(APIView):
    def get(self,request,post_id):
        try:
            post_id  = post_id
        except:
            return Response({'status' : 'failed' , 'message' : 'empty fields!'})

        if Post.objects.filter(id=post_id).exists():
            try:
                post = Post.objects.get(id=post_id)
                postData = PostSerializer(post).data
                if post.user.username == self.request.user.username:
                    postData['owner'] = True
                else:
                    postData['owner'] = False
                if PostLike.objects.filter(post=post,user=self.request.user).exists():
                    postData['current_user_liked'] =True
                else:
                    postData['current_user_liked'] = False
                return  Response({'status' : 'success' , 'message' : 'post data' , 'data' : postData})
            except:
                return Response({'status': 'failed', 'message': 'Internal Server Error!'})
        else:
            return  Response({'status' : 'failed' , 'message' : 'Post doesn\'t exist '})

@method_decorator(csrf_protect,name='dispatch')
class AllPostView(APIView):
    def get(self,request,username):
        if User.objects.filter(username=username).exists():
            posts = PostSerializer(Post.objects.filter(user=User.objects.get(username=username)).order_by('-created'),many=True).data
            owner = False
            if request.user.username == username:
                owner = True
            for post in posts:
                post['owner'] =owner
                if PostLike.objects.filter(post=Post.objects.get(id=post['id']), user=self.request.user).exists():
                    post['current_user_liked'] = True
                else:
                    post['current_user_liked'] = False

            return Response({'status': 'success', 'message': 'done' , 'data' : posts})
        else:
            return Response({'status': 'failed', 'message': 'User doesn\'t exist'})

@method_decorator(csrf_protect,name='dispatch')
class FollowProfileView(APIView):
    def post(self,request,format=None):
        if request.user.is_authenticated:
            data = self.request.data
            try:
                if 'username' in data:
                    username = data['username']
                    if User.objects.filter(username=username).exists():
                        if self.request.user.username == username:
                            return Response({'status': 'failed', 'message': 'cannot follow yourself!'})
                        else:
                            if Follow.objects.filter(follower=self.request.user,followee=User.objects.get(username=username)):
                                return Response({'status': 'success', 'message': self.request.user.username + ' already follows ' + username})
                            else:
                                follow = Follow(follower=request.user,followee=User.objects.get(username=username))
                                follow.save()
                                return Response({'status': 'success', 'message': self.request.user.username + ' followed ' + username  })
                    else:
                        return Response({'status': 'failed', 'message': 'User doesn\'t exist!'})
                else:
                    return Response({'status': 'failed', 'message' : 'Input field is empty!'})
            except:
                return Response({'status': 'failed' , 'message' : 'Internal server error!'})
        else:
            return Response({'status' : 'failed' , 'message' :'Unauthorized user!'})

@method_decorator(csrf_protect,name='dispatch')
class UnFollowProfileView(APIView):
    def post(self,request,format=None):
        if request.user.is_authenticated:
            data = self.request.data
            try:
               if 'username' in data:
                   username = data['username']
                   if User.objects.filter(username=username).exists():
                       if self.request.user.username == username:
                           return Response({'status': 'failed', 'message': 'cannot unfollow yourself!'})
                       else:
                           if Follow.objects.filter(follower=request.user,followee=User.objects.get(username=username)).exists():
                               Follow.objects.get(follower=request.user,followee=User.objects.get(username=username)).delete()
                               return Response({'status': 'success','message': self.request.user.username + ' unfollowed ' + username})
                           else:
                               return Response({'status': 'success','message': self.request.user.username + ' is not following ' + username})
                   else:
                       return Response({'status': 'success', 'message': 'User doesn\'t exist!'})
               else:
                   return Response({'status': 'failed', 'message': 'Input field is empty!'})
            except:
                return Response({'status': 'failed', 'message': 'Internal server error!'})
        else:
            return Response({'status': 'failed', 'message': 'Unauthorized user!'})

@method_decorator(csrf_protect,name='dispatch')
class FeedPostView(APIView):
    def get(self,request,format=None):
        if request.user.is_authenticated:
            if True:
                feed = FeedSerializer(request.user).data
                for post in feed['feed']:
                    post['owner'] = False
                    if PostLike.objects.filter(post=Post.objects.get(id=post['id']), user=self.request.user).exists():
                        post['current_user_liked'] = True
                    else:
                        post['current_user_liked'] = False
                return Response({'status' : 'success' , 'message' : 'User feed!', 'data' : feed})
        else:
            return Response({'status' : 'failed' , 'message' : 'Unauthorized user!'})


@method_decorator(csrf_protect,name='dispatch')
class LikePostView(APIView):
    def post(self,request,format=None):
        if request.user.is_authenticated:
            data = request.data
            try:
               if 'post_id' in data:
                  post_id = data['post_id']
                  if Post.objects.filter(id=post_id).exists():
                      if PostLike.objects.filter(post=Post.objects.get(id=post_id),user=self.request.user).exists():
                          return Response({'status': 'success', 'message': 'Post already liked by ' + self.request.user.username})
                      else:
                          postLike =  PostLike(user=self.request.user,post=Post.objects.get(id=post_id))
                          postLike.save()
                          activity = Activity(user=self.request.user,type=Activity.TYPE[4][0],post=Post.objects.get(id=post_id))
                          activity.save()
                          return Response({'status': 'success', 'message': 'Post liked by '+self.request.user.username})
                  else:
                      return Response({'status': 'failed', 'message': 'Post doesn\'t exist'})
               else:
                   return Response({'status' : 'failed' ,  'message' : 'Input field is empty!'})
            except:
                return Response({'status': 'failed', 'message': 'Internal server error!'})
        else:
            return Response({'status' : 'failed' ,  'message' : 'Unauthorized access !'})

@method_decorator(csrf_protect,name='dispatch')
class UnLikePostView(APIView):
    def post(self,request,format=None):
        if request.user.is_authenticated:
            data = request.data
            try:
               if 'post_id' in data:
                  post_id = data['post_id']
                  if Post.objects.filter(id=post_id).exists():
                      if PostLike.objects.filter(post=Post.objects.get(id=post_id),user=self.request.user).exists():
                          PostLike.objects.get(user=self.request.user,post=Post.objects.get(id=post_id)).delete()
                          return Response({'status': 'success', 'message': 'Post  unliked by ' + self.request.user.username})
                      else:
                          return Response({'status': 'success', 'message': 'Post already unliked by '+self.request.user.username})
                  else:
                      return Response({'status': 'failed', 'message': 'Post doesn\'t exist'})
               else:
                      return Response({'status' : 'failed' ,  'message' : 'Input field is empty!'})
            except:
                return Response({'status': 'failed', 'message': 'Internal server error!'})
        else:
            return Response({'status' : 'failed' ,  'message' : 'Unauthorized access !'})

@method_decorator(csrf_protect,name='dispatch')
class CreatePostCommentView(APIView):
    def post(self,request):
        if self.request.user.is_authenticated:
            data = request.data
            if 'post_id' in data and 'content' in data:
                post_id = data['post_id']
                content = data['content']
                if len(content)  >  0:
                    if Post.objects.filter(id=post_id).exists():
                        comment = PostComment(user=self.request.user,post=Post.objects.get(id=post_id),content=content)
                        comment.save()
                        commentData = { 'comment_id' : comment.id}
                        activity = Activity(user=self.request.user,type=Activity.TYPE[5][0],post=Post.objects.get(id=post_id))
                        activity.save()
                        return Response({'status' : 'success','message' : 'Commented successfully!' , 'data' : commentData })
                    else:
                        return Response({'status': 'failed', 'message': 'Post doesn\'t exists'})
                else:
                    return Response({'status': 'failed', 'message': 'Empty comment!'})
            else:
                return Response({'status': 'failed', 'message': 'One or more input field empty!'})
        else:
            return Response({'status': 'failed', 'message': 'Unauthorized access !'})

@method_decorator(csrf_protect,name='dispatch')
class DeletePostCommentView(APIView):
    pass

@method_decorator(csrf_protect,name='dispatch')
class PostAllCommentView(APIView):
    def get(self,request,post_id):
        if self.request.user.is_authenticated:
            if Post.objects.filter(id=post_id).exists():
                try:
                    commentsData = CommentSerializer(PostComment.objects.filter(post=Post.objects.get(id=post_id)).order_by('-created'),many=True).data
                    return Response({'status': 'success', 'message': 'Post comments data!','data' : commentsData})
                except:
                    return Response({'status': 'failed', 'message': 'Internal server error'})
            else:
                return Response({'status': 'failed', 'message': 'Post doesn\'t exists'})
        else:
            return Response({'status': 'failed', 'message': 'Unauthorized access !'})

@method_decorator(csrf_protect,name='dispatch')
class GetPostCommentView(APIView):
    def get(self,request,comment_id):
        if self.request.user.is_authenticated:
            if PostComment.objects.filter(id=comment_id).exists():
                postComment = PostComment.objects.get(id=comment_id)
                commentData = CommentSerializer(postComment).data
                return Response({'status': 'success' , 'message' : 'Comment data!' ,'data' : commentData})
            else:
                return Response({'status': 'failed' , 'message' : 'comment doesn\'t exists'})
        else:
            return Response({'status' : 'failed' , 'message' : 'Unauthorized user!'})

@method_decorator(csrf_protect,name='dispatch')
class SettingProfileView(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            if Setting.objects.filter(user=request.user).exists():
                setting = Setting.objects.get(user=request.user)
                settingData =  SettingSerializer(setting).data
                return Response({'status':'success','message':'User settings!','data':settingData})
            else:
                return Response({'status':'failed','message':'Something went wrong!'})
        else:
            return Response({'status': 'success', 'message': 'Unauthorized accesss!'})

@method_decorator(csrf_protect,name='dispatch')
class ActivityProfileView(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            followings = Follow.objects.filter(follower=self.request.user)
            activities = Activity.objects.none()
            for following in followings:
                activities = activities | Activity.objects.filter(user=following.followee)
            data = ActivitySerializer(activities.order_by('-created'),many=True).data
            return Response({'status':'success','message':'Activity Data!','data':data})
        else:
            return Response({'status':'failed','message':'Unauthorized access!'})

@method_decorator(csrf_protect,name='dispatch')
class SearchProfileView(APIView):
    def get(self,request,search):
        if request.user.is_authenticated:
            result = User.objects.filter(username__icontains=search)
            data = UserDetailsSerializer(result,many=True).data
            return Response({'status':'success','message':'Search data!','data':data})
        else:
            return  Response({'status':'failed','message':'Unauthorized user!'})
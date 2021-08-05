from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Post, Follow, PostLike, PostComment, Setting, Activity,Tag


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class FollowerSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')

    class Meta:
        model = Follow
        fields = ['username']

    def getUsername(self, obj):
        return obj.follower.username


class FollowingSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')

    class Meta:
        model = Follow
        fields = ['username']

    def getUsername(self, obj):
        return obj.followee.username


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    email = serializers.EmailField(max_length=254)
    dob = serializers.DateField(allow_null=True)
    contact = serializers.CharField(max_length=10)
    gender = serializers.SerializerMethodField('getGender')
    desc = serializers.CharField(max_length=100)
    join_date = serializers.DateTimeField()
    profile_img = serializers.ImageField()
    profile_banner = serializers.ImageField()
    followers = serializers.SerializerMethodField('getFollower')
    followings = serializers.SerializerMethodField('getFollowing')

    def getUsername(self, obj):
        return obj.user.username

    def getFollower(self, obj):
        return FollowerSerializer(Follow.objects.filter(followee=obj.user), many=True).data

    def getFollowing(self, obj):
        return FollowingSerializer(Follow.objects.filter(follower=obj.user), many=True).data

    def getGender(self, obj):
        if obj.gender == 'M':
            return 'Male'
        elif obj.gender == 'F':
            return 'Female'
        elif obj.gender == 'O':
            return 'Other'
        else:
            return 'Unknown'

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'gender', 'dob', 'contact', 'email', 'desc', 'join_date',
                  'profile_img', 'profile_banner', 'followers', 'followings']


class PostLikeSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')

    def getUsername(self, obj):
        return obj.user.username

    class Meta:
        model = PostLike
        fields = ['username']


class TagSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')

    def getUsername(self,obj):
        return obj.user.username

    class Meta:
        model = Tag
        fields = ['username']


class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')
    profile_img = serializers.SerializerMethodField('getProfileImg')
    name = serializers.SerializerMethodField('getName')
    likes = serializers.SerializerMethodField('getLikes')
    tags = serializers.SerializerMethodField('getTags')
    def getUsername(self, obj):
        return obj.user.username

    def getProfileImg(self, obj):
        return UserProfileSerializer(UserProfile.objects.get(user=obj.user)).data['profile_img']

    def getName(self, obj):
        profile = UserProfile.objects.get(user=obj.user)
        return profile.first_name + ' ' + profile.last_name

    def getLikes(self, obj):
        return PostLikeSerializer(PostLike.objects.filter(post=obj), many=True).data

    def getTags(self,obj):
        return TagSerializer(Tag.objects.filter(post=obj),many=True).data

    class Meta:
        model = Post
        fields = ['id', 'username', 'name', 'profile_img', 'created', 'content', 'type', 'image', 'video', 'likes','tags']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')
    name = serializers.SerializerMethodField('getName')
    profile_img = serializers.SerializerMethodField('getProfileImg')
    created = serializers.DateTimeField()
    content = serializers.CharField(max_length=500)

    def getUsername(self, obj):
        return obj.user.username

    def getProfileImg(self, obj):
        return UserProfileSerializer(UserProfile.objects.get(user=obj.user)).data['profile_img']

    def getName(self, obj):
        profile = UserProfile.objects.get(user=obj.user)
        return profile.first_name + ' ' + profile.last_name

    class Meta:
        model = PostComment
        fields = ['id', 'profile_img', 'username', 'name', 'created', 'content']


class FeedSerializer(serializers.ModelSerializer):
    feed = serializers.SerializerMethodField('getPosts')

    def getPosts(self, obj):
        follows = Follow.objects.filter(follower=obj)
        posts = Post.objects.none()
        for follow in follows:
            posts = posts | Post.objects.filter(user=follow.followee)
        data = PostSerializer(posts.order_by('-created'), many=True).data
        return data

    class Meta:
        model = User
        fields = ['id', 'username', 'feed']


class SettingSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')

    def getUsername(self, obj):
        return obj.user.username

    class Meta:
        model = Setting
        fields = ['id', 'username', 'dark_mode']


class ActivitySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('getUsername')
    type = serializers.SerializerMethodField('getType')
    post_id = serializers.SerializerMethodField('getPostId')
    post_owner = serializers.SerializerMethodField('getPostOwner')

    def getUsername(self, obj):
        return obj.user.username

    def getType(self, obj):
        return Activity.TYPE[obj.type - 1][1]

    def getPostId(self, obj):
        return obj.post.id

    def getPostOwner(self, obj):
        return obj.post.user.username

    class Meta:
        model = Activity
        fields = ['username', 'created','type', 'post_id','post_owner']

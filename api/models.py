from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


# Create your models here.
class UserProfile(models.Model):
    GENDER = [
        ('U', 'UNKNOWN'),
        ('M', 'MALE'),
        ('F', 'FEMALE'),
        ('O', 'OTHER')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    email = models.EmailField(max_length=254, default='')
    gender = models.CharField(max_length=1, choices=GENDER, default='U')
    dob = models.DateField(null=True)
    contact = models.IntegerField(null=True)
    desc = models.TextField(max_length="100", default="Hi I am a social media user!")
    join_date = models.DateTimeField(auto_now_add=True)
    profile_img = models.ImageField(upload_to='images/profile/', default='images/profile/default.jpg', null=True,
                                    blank=True)
    profile_banner = models.ImageField(upload_to='images/banner/', default='images/banner/default.png', null=True,
                                       blank=True)

    def __str__(self):
        return self.first_name


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=500, default='')
    type = models.CharField(max_length=10, default='text')
    video = models.FileField(upload_to='videos/post/', null=True, blank=True)
    image = models.ImageField(upload_to='images/post/', null=True, blank=True)

    def __str__(self):
        return self.type


class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.post.content + ' liked by ' + self.user.username


class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=200)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username + ' commented on ' + self.post.user.username + '\'s post'


class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
    followee = models.ForeignKey(User, related_name="followed", on_delete=models.CASCADE)

    def __str__(self):
        return self.follower.username + ' follows ' + self.followee.username


class Tag(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.post.user.username + ' tagged ' + self.user.username + ' in their post'


class Setting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dark_mode = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.user.username + ' settings'


class Activity(models.Model):
    TYPE = [
        (1, 'Updated Profile Picture'),
        (2, 'Updated Banner Image'),
        (3, 'Followed'),
        (4, 'Posted'),
        (5, 'Liked'),
        (6, 'Commented'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    type = models.IntegerField(choices=TYPE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username +' '+ self.TYPE[self.type-1][1]
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('', views.index, name='index'),
    #utility
    path('getcsrf', views.GetCSRFToken.as_view()),
    # account
    path('account/register', views.RegisterView.as_view()),
    path('account/login', views.LoginView.as_view()),
    path('account/logout', views.LogoutView.as_view()),
    path('account/delete', views.DeleteAccountView.as_view()),
    path('account/update',views.UpdateAccountView.as_view()),
    path('account/isauthenticated', views.IsAuthenticatedAccountView.as_view()),
    # path('account/update')

    # profile
    path('profile/user/search/<str:search>', views.SearchProfileView.as_view()),
    path('profile/user/<str:username>', views.ProfileView.as_view()),
    path('profile/user', views.CurrentUser.as_view()),
    path('profile/update', views.UpdateProfileView.as_view()),
    path('profile/follow', views.FollowProfileView.as_view()),
    path('profile/unfollow', views.UnFollowProfileView.as_view()),
    path('profile/setting', views.SettingProfileView.as_view()),
    path('profile/activity',views.ActivityProfileView.as_view()),

    # post
    path('post/feed',views.FeedPostView.as_view()),
    path('post/create', views.CreatePostView.as_view()),
    path('post/delete',views.DeletePostView.as_view()),
    path('post/update',views.UpdatePostView.as_view()),
    path('post/like',views.LikePostView.as_view()),
    path('post/unlike',views.UnLikePostView.as_view()),
    path('post/comment/create',views.CreatePostCommentView.as_view()),
    path('post/comment/delete',views.DeletePostCommentView.as_view()),
    path('post/comment/all/<int:post_id>', views.PostAllCommentView.as_view()),
    path('post/comment/<int:comment_id>', views.GetPostCommentView.as_view()),
    path('post/<int:post_id>', views.PostView.as_view()),
    path('post/<str:username>', views.AllPostView.as_view()),
]

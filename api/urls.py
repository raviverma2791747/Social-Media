from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('account/register', views.RegisterView.as_view()),
    path('account/login', views.LoginView.as_view()),
    path('account/logout', views.LogoutView.as_view()),
    path('account/delete',views.DeleteAccountView.as_view()),
    path('account/isauthenticated',views.CheckAuthenticatedView.as_view()),
    path('getcsrf',views.GetCSRFToken.as_view()),
]

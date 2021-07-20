from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.
@ensure_csrf_cookie
def index(request):
    return render(request,template_name='index.html')

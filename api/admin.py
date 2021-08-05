from django.contrib import admin
from .models import UserProfile, Post, Follow,PostLike,PostComment,Tag,Setting,Activity

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Post)
admin.site.register(Follow)
admin.site.register(PostLike)
admin.site.register(PostComment)
admin.site.register(Tag)
admin.site.register(Setting)
admin.site.register(Activity)
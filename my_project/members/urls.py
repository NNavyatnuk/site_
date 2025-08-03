from django.urls import path
from .views import *

urlpatterns = [
   path('login_user',login_user, name = 'login' ),
   path('register_page',registration_page, name = 'register' ),
   path('logout_u',logout_u, name = 'logout' )
]

from django.urls import path
from .views import login_user, registration_page, logout_u

urlpatterns = [
    path('login/', login_user, name='login'),
    path('register/', registration_page, name='register'),
    path('logout/', logout_u, name='logout'),
]

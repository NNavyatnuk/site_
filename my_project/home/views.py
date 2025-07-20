from django.shortcuts import render

from .models import NavBar

# Create your views here.
def home_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        url =  request.POST.get('url')
        if name and url:
            NavBar.objects.create(name=name,url=url)
    nav_bar = NavBar.objects.all()
    return render(request, 'home/home.html' , {'nav_content': nav_bar})


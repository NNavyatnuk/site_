from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm


# 🔹 Логін
def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # ✅ логін зберігає користувача у сесії
            messages.success(request, f"Вітаю, {username}!")
            return redirect('home')
        else:
            messages.error(request, "❌ Невірний логін або пароль!")
            return redirect('login')
    return render(request, 'auth/login.html')


# 🔹 Реєстрація
def registration_page(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            # ✅ обов'язково передаємо request в authenticate
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)  # ✅ після реєстрації автоматично логінить
                messages.success(request, f"Аккаунт {username} створено і ви увійшли!")
                return redirect('home')
            else:
                messages.error(request, "Помилка входу після реєстрації.")
                return redirect('login')
        else:
            messages.error(request, "❌ Форма заповнена неправильно!")
    else:
        form = UserCreationForm()
    return render(request, 'auth/register.html', {'form': form})


# 🔹 Логаут
def logout_u(request):
    logout(request)
    messages.info(request, "Ви вийшли з акаунту.")
    return redirect('home')

from django.shortcuts import render,redirect
from .forms import RegisterForm, UserProfileForm
from . models import UserProfile
from django.contrib.auth import login, get_user_model

User = get_user_model()

def role_based_redirect(request):
    if request.user.groups.filter(name='manager').exists():
        return redirect('dashboard:manager_dashboard')
    else:
        return redirect('dashboard:client_dashboard')

def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard:client_dashboard')
        else:
            form = RegisterForm()

        return render(request, 'registration/sign_up.html', {"form": form})

def accountSettings(request):
    if not request.user.groups.filter(name__in=['default', 'manager']).exists():
        return redirect('dashboard:client_dashboard')

    profile, created = UserProfile.objects.get_or_create(user=request.user)
    form = UserProfileForm(instance=profile)

    if created:
        if request.user.groups.filter(name='manager').exists():
            return redirect('dashboard:manager_dashboard')
        elif request.user.groups.filter(name='default').exists():
            return redirect('dashboard:client_dashboard')


    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('account:account')

        context = {'form': form}
        return redirect(request, 'account/account_settings.html', context)
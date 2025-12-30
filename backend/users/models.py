# backend/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
     email = models.EmailField(unique=True)
     full_name = models.CharField(max_length=255)
     role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('user', 'User')], default='user')
     status = models.CharField(max_length=10, choices=[('active', 'Active'), ('inactive', 'Inactive')], default='active')
     updated_at = models.DateTimeField(auto_now=True)

     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS = ['username', 'full_name']
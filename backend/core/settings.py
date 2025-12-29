import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# Load .env file
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Security Settings
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')

# Application definition
INSTALLED_APPS = [
     'django.contrib.admin',
     'django.contrib.auth',
     'django.contrib.contenttypes',
     'django.contrib.sessions',
     'django.contrib.messages',
     'django.contrib.staticfiles',
     
     # Required Third-Party Apps
     'rest_framework',
     'rest_framework_simplejwt', # For JWT 
     'corsheaders',              # For Frontend-Backend communication
     
     # Internal Apps
     'users',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # MUST be at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Set Custom User Model
AUTH_USER_MODEL = 'users.User'

# Database Configuration
DATABASES = {
     'default': {
          'ENGINE': 'djongo',
          'NAME': 'user_management_db',
          'ENFORCE_SCHEMA': False,
          'CLIENT': {
               'host': os.getenv('DATABASE_URL'), # Your MongoDB Atlas Connection String
          }
     }
}

# REST Framework Config [cite: 45, 80]
REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework_simplejwt.authentication.JWTAuthentication',
     ),
     'DEFAULT_PERMISSION_CLASSES': [
          'rest_framework.permissions.IsAuthenticated',
     ],
     'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
     'PAGE_SIZE': 10, # Requirement: 10 users per page [cite: 80]
     }

# JWT Config [cite: 26, 59]
SIMPLE_JWT = {
     'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
     'SIGNING_KEY': SECRET_KEY,
     'AUTH_HEADER_TYPES': ('Bearer',),
}

# CORS Configuration [cite: 130]
CORS_ALLOW_ALL_ORIGINS = True # Change to specific domains for production
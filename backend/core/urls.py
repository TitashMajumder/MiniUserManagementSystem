# backend/core/urls.py
from django.contrib import admin
from django.urls import path, include
from users.serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import (
     TokenObtainPairView,
     TokenRefreshView,
)

class MyTokenObtainPairView(TokenObtainPairView):
     serializer_class = CustomTokenObtainPairSerializer
urlpatterns = [
     path('admin/', admin.site.urls),
     # Authentication endpoints 
     path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     # Application endpoints
     path('api/', include('users.urls')), 
]
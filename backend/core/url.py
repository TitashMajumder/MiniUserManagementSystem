from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
     TokenObtainPairView,
     TokenRefreshView,
)

urlpatterns = [
     path('admin/', admin.site.urls),
     # Authentication endpoints 
     path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     # Application endpoints
     path('api/', include('users.urls')), 
]
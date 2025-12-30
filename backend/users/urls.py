# backend/users/urls.py
from django.urls import path
from .views import (
     UserSignupView,
     UserProfileView,
     AdminUserListView,
     ToggleUserStatusView,
     ChangePasswordView
)

urlpatterns = [
     # User Functions
     path('auth/signup/', UserSignupView.as_view(), name='signup'),
     path('users/me/', UserProfileView.as_view(), name='user-profile'),
     path('users/change-password/', ChangePasswordView.as_view()),
     # Admin Management Functions
     path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
     path('admin/users/<int:pk>/toggle/', ToggleUserStatusView.as_view(), name='toggle-status'),
]
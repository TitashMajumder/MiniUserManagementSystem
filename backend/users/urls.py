from django.urls import path
from .views import (
     UserSignupView,
     UserProfileView,
     AdminUserListView,
     ToggleUserStatusView
)

urlpatterns = [
     # User Functions
     path('auth/signup/', UserSignupView.as_view(), name='signup'),
     path('users/me/', UserProfileView.as_view(), name='user-profile'),
     
     # Admin Management Functions
     path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
     path('admin/users/<int:pk>/toggle/', ToggleUserStatusView.as_view(), name='toggle-status'),
]
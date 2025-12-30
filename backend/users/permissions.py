# backend/users/permissions.py
from rest_framework import permissions

class IsAdminRole(permissions.BasePermission):
     """
     Allows access only to users with the 'admin' role
     """
     def has_permission(self, request, view):
          # Ensure user is logged in and has the specific 'admin' string role 
          return (
               request.user and 
               request.user.is_authenticated and 
               getattr(request.user, 'role', None) == 'admin'
          )

class IsOwnerOrAdmin(permissions.BasePermission):
     """
     Allows users to edit their own profile, but admins have full access
     """
     def has_object_permission(self, request, view, obj):
          # Safety check for authentication
          if not request.user or not request.user.is_authenticated:
               return False
               
          # Admins bypass ownership checks
          if request.user.role == 'admin':
               return True
               
          # Users can only access their own data
          return obj == request.user
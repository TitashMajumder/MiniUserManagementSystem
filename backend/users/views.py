# backend/users/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminRole
from django.contrib.auth import authenticate
from .serializers import ChangePasswordSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
     """
     User Functions: View/Update own profile
     """
     serializer_class = UserSerializer
     permission_classes = [permissions.IsAuthenticated]
     
     def get_object(self):
          return self.request.user

class AdminUserListView(generics.ListAPIView):
     """
     Admin Functions: View all users with pagination
     """
     queryset = User.objects.all().order_by('-date_joined')
     serializer_class = UserSerializer
     permission_classes = [IsAdminRole] # Use custom role check

class ToggleUserStatusView(generics.UpdateAPIView):
     """
     Admin Functions: Activate/Deactivate user accounts
     """
     queryset = User.objects.all()
     serializer_class = UserSerializer # Required for get_object()
     permission_classes = [IsAdminRole] # Use custom role check
     
     def patch(self, request, *args, **kwargs):
          user = self.get_object()
          # Toggle the actual Django boolean field that controls login permission
          user.is_active = not user.is_active
          # Optional: if you specifically need the 'status' string for other logic
          user.status = 'active' if user.is_active else 'inactive'
          user.save()
          return Response({
               "email": user.email,
               "is_active": user.is_active,
               "status": user.status
          }, status=status.HTTP_200_OK)

class UserSignupView(generics.CreateAPIView):
     """
     Authentication: User signup with email, password, full name
     """
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [permissions.AllowAny]

class ChangePasswordView(generics.UpdateAPIView):
     serializer_class = ChangePasswordSerializer
     permission_classes = [permissions.IsAuthenticated]

     def update(self, request, *args, **kwargs):
          user = request.user
          serializer = self.get_serializer(data=request.data)
          serializer.is_valid(raise_exception=True)

          if not user.check_password(serializer.validated_data['old_password']):
               return Response({"error": "Wrong password"}, status=400)

          user.set_password(serializer.validated_data['new_password'])
          user.save()
          return Response({"message": "Password updated"})
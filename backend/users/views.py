from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdminRole

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
          # Toggle between 'active' and 'inactive' status 
          user.status = 'active' if user.status == 'inactive' else 'inactive'
          user.save()
          return Response({
               "email": user.email,
               "status": user.status
          }, status=status.HTTP_200_OK)

class UserSignupView(generics.CreateAPIView):
     """
     Authentication: User signup with email, password, full name
     """
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [permissions.AllowAny]
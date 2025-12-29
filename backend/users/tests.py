from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserManagementTests(TestCase):
     def setUp(self):
          self.client = APIClient()
          # Create an Admin User
          self.admin_user = User.objects.create_user(
               email="admin@test.com",
               username="admin",
               password="SecurePassword123!",
               full_name="Admin User",
               role="admin"
          )
          # Create a Regular User
          self.regular_user = User.objects.create_user(
               email="user@test.com",
               username="user",
               password="SecurePassword123!",
               full_name="Regular User",
               role="user"
          )

     # Test 1: Successful User Signup
     def test_user_signup(self):
          data = {
               "email": "newuser@test.com",
               "password": "NewPassword123!",
               "full_name": "New User"
          }
          response = self.client.post("/api/auth/signup/", data)
          self.assertEqual(response.status_code, status.HTTP_201_CREATED)

     # Test 2: Email Format Validation
     def test_invalid_email_signup(self):
          data = {
               "email": "not-an-email",
               "password": "Password123!",
               "full_name": "Invalid Email"
          }
          response = self.client.post("/api/auth/signup/", data)
          self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

     # Test 3: Admin Access to User List
     def test_admin_can_view_users(self):
          self.client.force_authenticate(user=self.admin_user)
          response = self.client.get("/api/admin/users/")
          self.assertEqual(response.status_code, status.HTTP_200_OK)

     # Test 4: Regular User Denied Admin Access
     def test_user_cannot_view_admin_list(self):
          self.client.force_authenticate(user=self.regular_user)
          response = self.client.get("/api/admin/users/")
          self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

     # Test 5: User Status Toggle (Admin Only)
     def test_admin_can_deactivate_user(self):
          self.client.force_authenticate(user=self.admin_user)
          response = self.client.patch(f"/api/admin/users/{self.regular_user.id}/toggle/")
          self.regular_user.refresh_from_db()
          self.assertEqual(self.regular_user.status, "inactive")
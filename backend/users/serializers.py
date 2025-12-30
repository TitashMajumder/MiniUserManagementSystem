# backend/users/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User
import re

class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ['id', 'email', 'full_name', 'role', 'status', 'password']
          extra_kwargs = {'password': {'write_only': True}}

     def validate_email(self, value):
          if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
               raise serializers.ValidationError("Invalid email format.")
          return value

     def create(self, validated_data):
          validated_data['username'] = validated_data.get('email')
          user = User.objects.create_user(**validated_data) # Hashes automatically
          return user

     def validate_password(self, value):
          if len(value) < 8:
               raise serializers.ValidationError("Password must be at least 8 characters.")
          if not any(char.isdigit() for char in value):
               raise serializers.ValidationError("Password must contain at least one number.")
          return value

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
     username_field = 'email' # Tell JWT to use email as the identifier

     def validate(self, attrs):
          # This bypasses the 'required field' check for 'username'
          data = super().validate(attrs)
          return data

class ChangePasswordSerializer(serializers.Serializer):
     old_password = serializers.CharField()
     new_password = serializers.CharField()

     def validate_new_password(self, value):
          if len(value) < 8:
               raise serializers.ValidationError("Password too short")
          return value
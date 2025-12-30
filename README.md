🧑‍💻 Mini User Management System

A full-stack User Management System built as part of the Backend Developer Intern Assessment.
The application supports JWT-based authentication, role-based access control (RBAC), and user lifecycle management with separate privileges for admin and regular users.

📌 Project Overview

This application allows users to:

Sign up and log in securely using JWT authentication

View and update their profile information

Change their password

Log out securely

Admins can additionally:

View all users with pagination

Activate or deactivate user accounts

Enforce role-based access control

The system demonstrates clean backend architecture, secure authentication practices, and a modern React-based frontend.

🛠 Tech Stack
Backend

Python

Django

Django REST Framework

JWT Authentication (SimpleJWT)

PostgreSQL (Cloud-hosted)

bcrypt (Django password hashing)

Frontend

React (Vite)

React Router

Context API

Axios

Tailwind CSS

Deployment

Backend: Render / Railway

Frontend: Vercel

Database: Neon (PostgreSQL)

⚙️ Features
Authentication

User signup with email, password, full name

Email format validation

Password strength validation

JWT token generation on signup & login

Secure logout (stateless JWT)

User Functions

View own profile

Edit full name and email

Change password

Logout

Admin Functions

View all users (paginated – 10 per page)

Activate / deactivate user accounts

Role-based route protection (admin-only access)

Security

Password hashing

JWT-protected APIs

Role-based access control (admin/user)

Input validation

Environment variables for secrets

Proper HTTP status codes

🧩 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup/	User signup
POST	/api/auth/login/	User login
POST	/api/auth/token/refresh/	Refresh JWT token
User
Method	Endpoint	Description
GET	/api/users/me/	Get current user
PUT	/api/users/me/	Update profile
PUT	/api/users/change-password/	Change password
Admin
Method	Endpoint	Description
GET	/api/admin/users/	List all users (paginated)
PATCH	/api/admin/users/{id}/toggle/	Activate/deactivate user
🔐 Environment Variables
Backend (.env)
SECRET_KEY=your_secret_key
DEBUG=False
DATABASE_URL=postgresql://user:password@host:port/dbname
ALLOWED_HOSTS=*

Frontend (.env)
VITE_API_URL=https://your-backend-url/api


⚠️ .env files are excluded from version control.

▶️ Setup Instructions (Local)
Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend
cd frontend
npm install
npm run dev

🧪 Testing

Backend unit tests written using Django TestCase

Covers signup, RBAC, admin permissions, and user status toggling

Run tests:

python manage.py test

🌐 Live Deployment

Frontend: https://mini-user-management-system-jet.vercel.app

Backend API: https://miniusermanagementsystem-b08u.onrender.com

Database: PostgreSQL (Neon)

🎥 Walkthrough Video

A 3–5 minute walkthrough video demonstrating:

Signup & login

Role-based access

Profile editing

Password change

Admin dashboard & user activation/deactivation

Live deployed application

📎 Video Link: (Add your link here)

📁 Repository Structure
Mini_User_Management_System/
│
├── backend/
│   ├── core/
│   ├── users/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   └── vite.config.js
│
└── README.md

👤 Author

Titash Majumder
Backend Developer Intern Candidate
📧 Email: majumdertitash@gmail.com

🔗 GitHub: https://github.com/TitashMajumder

✅ Submission Checklist

 Public GitHub repository

 Backend deployed

 Frontend deployed

 Cloud database used

 README included

 Walkthrough video recorded

🚀 Final Note

This project focuses on clean backend architecture, secure authentication, and practical RBAC implementation, aligned strictly with the assessment requirements.
mini-user-management/
├── .gitignore               # Exclude .env, venv, node_modules
├── README.md                # Overview, Tech Stack, Setup, API Docs
│
├── backend/                 # Django Root
│   ├── .env                 # Secret keys and DB URL
│   ├── manage.py
│   ├── requirements.txt     # django, djangorestframework, simplejwt, cors-headers
│   ├── Procfile             # For deployment to Render/Railway 
│   ├── core/                # Project Configuration
│   │   ├── settings.py      # CORS and JWT configs
│   │   └── urls.py          # Main routing
│   └── users/               # Main App
│       ├── models.py        # Custom User (email, full_name, role, status)
│       ├── serializers.py   # Auth and User management logic
│       ├── views.py         # Paginated list, profile updates
│       ├── permissions.py   # Admin-only access logic
│       ├── tests.py         # Mandatory 5+ unit tests 
│       └── urls.py          # App-specific endpoints
│
└── frontend/                # React Root
    ├── package.json
    ├── .env                 # VITE_API_URL or REACT_APP_API_URL
    ├── public/
    └── src/
        ├── api/             # Axios instance & interceptors
        ├── components/      # UI: Navbar, ProtectedRoute, Modal, Toast
        ├── context/         # AuthContext for token management
        ├── pages/           # Signup, Login, Profile, AdminDashboard
        ├── App.jsx          # Route definitions
        └── main.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
     return (
          <AuthProvider>
               <Router>
                    <Routes>
                         {/* Public Routes */}
                         <Route path="/login" element={<Login />} />
                         <Route path="/signup" element={<Signup />} />
                         
                         {/* Private Routes */}
                         <Route path="/profile" element={
                              <ProtectedRoute>
                                   <Profile />
                              </ProtectedRoute>
                         } />
                         
                         {/* Admin Only Route */}
                         <Route path="/admin" element={
                              <ProtectedRoute adminOnly={true}>
                                   <AdminDashboard />
                              </ProtectedRoute>
                         } />

                         {/* Default Redirect */}
                         <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
               </Router>
          </AuthProvider>
     );
}

export default App;
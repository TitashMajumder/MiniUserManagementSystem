import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const { login } = useContext(AuthContext);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const res = await api.post('/auth/login/', { email, password });
               // Save tokens and update context
               login(res.data.access, res.data.refresh);
               navigate('/profile');
          } catch (err) {
               alert("Invalid credentials or account inactive");
          }
     };

     return (
          <div className="flex flex-col items-center justify-center h-screen">
               <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" 
                         onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full mb-4 p-2 border" 
                         onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
                    <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link></p>
               </form>
          </div>
     );
};

export default Login;
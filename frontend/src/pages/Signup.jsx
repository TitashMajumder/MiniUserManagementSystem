import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', full_name: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup/', formData);
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert("Signup failed. Check your details.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-8 border rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                <input type="text" placeholder="Full Name" className="w-full mb-2 p-2 border" 
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
                <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full mb-4 p-2 border" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <div className="bg-gray-100 p-6 rounded shadow">
                <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                <p className="mb-2"><strong>Role:</strong> {user?.role}</p>
                <p className="mb-4 text-sm text-gray-500 italic">User ID: {user?.user_id}</p>
                <button 
                    onClick={logout} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
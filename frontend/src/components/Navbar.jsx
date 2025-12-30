// frontend/src/components/Navbar.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link to="/profile">Profile</Link>
        {user.role === 'admin' && <Link to="/admin">Admin</Link>}
      </div>

      <div className="flex gap-4 items-center">
        <span>{user.email} ({user.role})</span>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

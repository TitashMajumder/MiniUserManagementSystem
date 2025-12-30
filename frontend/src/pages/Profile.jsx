// frontend/src/pages/Profile.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user.full_name || '');
  const [email, setEmail] = useState(user.email || '');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const updateProfile = async () => {
    try {
      const res = await api.put('/users/me/', {
        full_name: fullName,
        email: email,
      });
      setUser(res.data);
      alert('Profile updated');
      setEditing(false);
    } catch {
      alert('Failed to update profile');
    }
  };

  const changePassword = async () => {
    try {
      await api.put('/users/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      alert('Password updated');
      setOldPassword('');
      setNewPassword('');
    } catch {
      alert('Password change failed');
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="bg-gray-100 p-6 rounded shadow space-y-4">
        {/* Profile Info */}
        {editing ? (
          <>
            <input
              className="w-full p-2 border"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              className="w-full p-2 border"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="flex gap-2">
              <button onClick={updateProfile} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setEditing(false)} className="bg-gray-400 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        )}

        <hr />

        {/* Change Password */}
        <h2 className="font-semibold">Change Password</h2>
        <input
          type="password"
          className="w-full p-2 border"
          placeholder="Old Password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button
          onClick={changePassword}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>

        <hr />

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

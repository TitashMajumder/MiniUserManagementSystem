// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users/?page=${page}`);
      setUsers(res.data.results);
    } catch (err) {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleStatus = async (user) => {
    const action =
      user.status === 'active' ? 'deactivate' : 'activate';

    const confirm = window.confirm(
      `Are you sure you want to ${action} this user?`
    );

    if (!confirm) return;

    try {
      await api.patch(`/admin/users/${user.id}/toggle/`);
      alert(`User ${action}d successfully`);
      fetchUsers();
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.full_name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <span
                    className={
                      user.status === 'active'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => toggleStatus(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
import { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
     const [users, setUsers] = useState([]);
     const [page, setPage] = useState(1);

     const fetchUsers = async () => {
          try {
               const res = await api.get(`/admin/users/?page=${page}`);
               setUsers(res.data.results);
          } catch (err) { alert("Failed to fetch users"); }
     };

     useEffect(() => { fetchUsers(); }, [page]);

     const toggleStatus = async (id) => {
          await api.patch(`/admin/users/${id}/toggle/`);
          fetchUsers(); // Refresh list
     };

     return (
          <div className="p-8">
               <h2 className="text-2xl font-bold mb-4">User Management</h2>
               <table className="min-w-full bg-white border">
                    <thead>
                         <tr>
                              <th className="border p-2">Name</th>
                              <th className="border p-2">Email</th>
                              <th className="border p-2">Status</th>
                              <th className="border p-2">Action</th>
                         </tr>
                    </thead>
                    <tbody>
                         {users.map(u => (
                         <tr key={u.id} className="text-center">
                              <td className="border p-2">{u.full_name}</td>
                              <td className="border p-2">{u.email}</td>
                              <td className="border p-2">
                                   <span className={u.is_active ? "text-green-500" : "text-red-500"}>
                                        {u.is_active ? "Active" : "Inactive"}
                                   </span>
                              </td>
                              <td className="border p-2">
                                   <button onClick={() => toggleStatus(u.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                        Toggle Status
                                   </button>
                              </td>
                         </tr>
                         ))}
                    </tbody>
               </table>
               <div className="mt-4">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                    <span className="mx-4">Page {page}</span>
                    <button onClick={() => setPage(p => p + 1)}>Next</button>
               </div>
          </div>
     );
};

export default AdminDashboard;
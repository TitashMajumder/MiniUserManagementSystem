// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const token = localStorage.getItem('access_token');
          if (!token) {
               setLoading(false);
               return;
          }

          api.get('/users/me/')
               .then(res => setUser(res.data))
               .catch(() => {
                    localStorage.clear();
                    setUser(null);
               })
               .finally(() => setLoading(false));
     }, []);

     const login = async (access, refresh) => {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          const res = await api.get('/users/me/');
          setUser(res.data);
     };

     const logout = () => {
          localStorage.clear();
          setUser(null);
     };

     return (
          <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
               {children}
          </AuthContext.Provider>
     );
};
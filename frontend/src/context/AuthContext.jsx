import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const token = localStorage.getItem('access_token');
          if (token) {
               try {
                    const decoded = jwtDecode(token);
                    setUser(decoded); // contains user_id, email, and role
               } catch (e) {
                    localStorage.clear();
               }
          }
          setLoading(false);
     }, []);

     const login = (access, refresh) => {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          const decoded = jwtDecode(access);
          setUser(decoded);
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
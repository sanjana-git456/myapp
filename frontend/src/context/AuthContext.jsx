import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, we'd call /auth/me here
      // For this demo, we'll assume the token is valid if it exists
      // and we'd ideally have stored user info too
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await client.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    navigate('/dashboard');
  };

  const register = async (username, email, password, role) => {
    const res = await client.post('/auth/register', { username, email, password, role });
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
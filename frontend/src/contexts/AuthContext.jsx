import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/user');
      setCurrentUser(response.data);
    } catch (error) {
      setCurrentUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function signup(email, password, username) {
    const user = username || email.split('@')[0];
    await api.post('/auth/register', { username: user, email, password });
    return login(email, password);
  }

  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setCurrentUser(response.data.user);
    return response.data;
  }

  function loginWithGoogle() {
    throw new Error("Google Login is not supported with current Django backend.");
  }

  async function logout() {
    try {
        await api.post('/auth/logout');
    } catch(e) {
        console.error(e)
    } finally {
        localStorage.removeItem('token');
        setCurrentUser(null);
    }
  }

  function resetPassword(email) {
    throw new Error("Password reset not yet implemented on Django backend.");
  }

  const value = {
    currentUser,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

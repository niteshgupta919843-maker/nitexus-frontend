
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage on app start
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nitexus_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login: save user + token to state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('nitexus_user', JSON.stringify(userData));
  };

  // Logout: clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nitexus_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

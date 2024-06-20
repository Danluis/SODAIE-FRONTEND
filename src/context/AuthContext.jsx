import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsRegister(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

// Definir la función signin con la lógica de redirección para administradores
const signin = async (user) => {
  try {
      const res = await loginRequest(user);
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsAuthenticated(true);
  } catch (error) {
      if (Array.isArray(error.response.data)) {
          return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
  }
};

  const logout = async () => {
    try {
      const res = await logoutRequest();
      console.log(res);
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      user,
      isRegister,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  );
};

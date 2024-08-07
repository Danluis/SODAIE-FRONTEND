import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { registerRequest, loginRequest, logoutRequest, check_emailRequest, update_passwordRequest } from '../api/auth.js';
import { useAuthStore } from "../store/authStore.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { setGoogleUser } = useAuthStore(state => state);

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState([]);
  const [emailToReset, setEmailToReset] = useState(''); // Estado para almacenar el email al que se va a restablecer la contraseña

  const navigate = useNavigate();

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
      setIsAuthenticated(true);
      setIsRegister(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.headers["set-cookie"]);
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  const logout = async () => {
    try {
      const res = await logoutRequest();
      console.log(res);
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      setIsRegister(false);
      setGoogleUser('');
      navigate('/');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  const checkEmail = async (email) => {
    try {
      const res = await check_emailRequest({ email });
      setEmailToReset(email); // Almacenar el email en el contexto
      return res.data;
    } catch (error) {
      setErrors([error.response.data.message]);
      throw error;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
        const res = await update_passwordRequest({ email: emailToReset, newPassword });
        return res.data;
    } catch (error) {
        setErrors([error.response.data.message]);
        throw error;
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

  useEffect(() => {
    const cookies = Cookies.get();

    if (cookies) {
      console.log(cookies.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      checkEmail,
      updatePassword,
      setUser,
      setIsAuthenticated,
      setIsRegister,
      setErrors,
      user,
      isRegister,
      isAuthenticated,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  );
};

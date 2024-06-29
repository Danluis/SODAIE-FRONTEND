import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth.js';
import Cookies from 'js-cookie'
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
      setIsAuthenticated(true)
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
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
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
    const cookies = Cookies.get()

    if(cookies){
      console.log(cookies.token);
    }
  })

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

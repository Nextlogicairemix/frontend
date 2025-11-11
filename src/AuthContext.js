
import React, { createContext, useContext, useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "https://nextlogic-backend.onrender.com";

const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
};


const apiFetch = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Network error" }));
    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
};


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiFetch(ENDPOINTS.ME);
      setUser(data);
    } catch (err) {
      console.log("Not authenticated");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  const login = async (email, password) => {
    setError(null);
    try {
      const data = await apiFetch(ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, accessCode = null) => {
    setError(null);
    try {
      const data = await apiFetch(ENDPOINTS.REGISTER, {
        method: "POST",
        body: JSON.stringify({ name, email, password, access_code: accessCode }),
      });
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await apiFetch(ENDPOINTS.LOGOUT, { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isTeacher = () => user?.role === "admin";
  const isStudent = () => user?.role === "student";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        checkAuth,
        isTeacher,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
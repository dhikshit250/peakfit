import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Invalid token:", error);
          logout();
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
      try {
        const decoded = jwtDecode(accessToken);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    } else {
      console.error("Received invalid tokens.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        token: localStorage.getItem("access_token"), // ✅ This makes `token` accessible!
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

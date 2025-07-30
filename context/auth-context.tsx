"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { User, AuthContextType } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authStatus = localStorage.getItem("isAuthenticated");
      const userData = localStorage.getItem("user");

      if (authStatus === "true" && userData) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Failed to save user data");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              borderTop: "3px solid #ffffff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

"use client";

import { useState, useEffect } from "react";
import type { AuthState, LoginResponse } from "@/types";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    token: null,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setAuthState({
          isLoggedIn: true,
          user,
          token,
        });
      } catch (error) {
        console.error("Error parsing user info:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
      }
    }
  }, []);

  const login = (loginResponse: LoginResponse) => {
    if (loginResponse.success) {
      const { userInfo, token } = loginResponse;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Update state
      setAuthState({
        isLoggedIn: true,
        user: userInfo,
        token,
      });
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // Update state
    setAuthState({
      isLoggedIn: false,
      user: null,
      token: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}

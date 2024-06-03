"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to indicate loading

  // Check if user is logged in from session storage on component mount.
  useEffect(() => {
    const loggedIn =
      sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_EMAIL) === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const signin = (email, password) => {
    const envEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;

    if (email === envEmail && password === envPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem(process.env.NEXT_PUBLIC_ADMIN_EMAIL, "true");
      setTimeout(logout, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      return true;
    } else {
      setIsLoggedIn(false);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem(process.env.NEXT_PUBLIC_ADMIN_EMAIL);
  };

  return (
    <AuthContext.Provider value={{ signin, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

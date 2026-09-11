import { createContext, useEffect, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  async function login(data) {
    const response = await api.post("/user/login", data);

    setUser(response.data.data);

    return response;
  }
  async function logout() {
    try {
      await api.post("/user/logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await api.get("/user/me");
        setUser(response.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    getCurrentUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, authLoading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

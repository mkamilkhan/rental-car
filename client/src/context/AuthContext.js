import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  console.log("AuthContext: Initializing");

  // Fetch user from server
  const fetchUser = async () => {
    const currentToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!currentToken) {
      console.log("AuthContext: No token, skipping fetchUser");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      axios.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
      const response = await axios.get(`${apiUrl}/api/auth/me`);
      console.log("AuthContext: User fetched:", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("AuthContext: Error fetching user:", error);
      // Don't remove token on network errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // 1️⃣ Check URL token (VERY IMPORTANT)
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");

      // 2️⃣ Check storages
      const localToken = localStorage.getItem("token");
      const sessionToken = sessionStorage.getItem("token");

      console.log("AuthContext: URL token:", !!urlToken);
      console.log("AuthContext: localStorage token:", !!localToken);
      console.log("AuthContext: sessionStorage token:", !!sessionToken);

      const finalToken = urlToken || localToken || sessionToken;

      console.log("AuthContext: Final token:", !!finalToken);

      if (finalToken) {
        localStorage.setItem("token", finalToken);
        sessionStorage.setItem("token", finalToken);
        setToken(finalToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${finalToken}`;
        
        // Fetch user from server
        await fetchUser();
      } else {
        setToken(null);
        setUser(null);
      }

      setAuthLoading(false);
    };

    initAuth();
  }, []);

  const login = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    sessionStorage.setItem("token", tokenValue);
    setToken(tokenValue);
    setUser(userData);
    setAuthLoading(false);
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
    
    // Fetch complete user data from server
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

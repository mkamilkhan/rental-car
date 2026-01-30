import React, { useEffect, useContext, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [status, setStatus] = useState("Processing login...");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (!token || !email || !name) {
      navigate("/login?error=missing_params", { replace: true });
      return;
    }

    // Save token
    localStorage.setItem("token", token);
    sessionStorage.setItem("token", token); // Backup
    
    // Save email as backup (in case user object takes time to load)
    localStorage.setItem("userEmail", decodeURIComponent(email));

    // Axios header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Context login
    login(token, {
      name: decodeURIComponent(name),
      email: decodeURIComponent(email),
      role: "user"
    });

    // Get saved path for redirect
    const from = localStorage.getItem("from") || sessionStorage.getItem("from");
    
    // Determine redirect path – never send Google login to Admin Login page
    let redirectPath = "/";
    if (from && from.includes("/booking/")) {
      redirectPath = from;
      console.log("Redirecting to booking form:", redirectPath);
    } else if (from && from !== "/login" && from !== "/") {
      // Don't redirect to /admin after Google login – go home or My Bookings
      if (from === "/admin" || from.startsWith("/admin")) {
        redirectPath = "/my-bookings";
        console.log("Redirecting to My Bookings (not Admin):", redirectPath);
      } else {
        redirectPath = from;
        console.log("Redirecting to saved path:", redirectPath);
      }
    }

    // Remove from storage
    if (from) {
      localStorage.removeItem("from");
      sessionStorage.removeItem("from");
    }

    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Redirect after short delay
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 500);
  }, [searchParams, navigate, login]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p>{status}</p>
    </div>
  );
};

export default AuthCallback;

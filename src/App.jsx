import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/Profile";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Retrieve user data from localStorage (if available)
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <Router>
      <Routes>
        {/* AuthForm route */}
        <Route
          path="/"
          element={<AuthForm setCurrentUser={setCurrentUser} />}
        />

        {/* Dashboard route (Only for admin) */}
        <Route
          path="/dashboard"
          element={
            currentUser?.role === "admin" ? (
              <Dashboard setCurrentUser={setCurrentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Profile page route (Accessible for all logged-in users) */}
        <Route
          path="/profile"
          element={
            currentUser?.role === "member" || currentUser?.role === "team lead" || currentUser?.role === "admin" ? (
              <ProfilePage currentUser={currentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

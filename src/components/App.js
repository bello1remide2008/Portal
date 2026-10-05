import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Blog from "./Blog";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import SubjectSelectionPage from "./SubjectSelectionPage";
import AdminRoute from "./AdminRoute";
import LoginChoice from "./LoginChoice";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  /* ---------------- NAVBAR VISIBILITY ---------------- */
  const noNavbarRoutes = ["/login", "/admin-login", "/login-choice", "/blog", "/dashboard"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  /* ---------------- SAVE USERS ---------------- */
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  /* ---------------- STUDENT REGISTER ---------------- */
  const handleRegister = (data) => {
    const newUsername = `LYCSCHOOL${1000 + users.length}`;
    const newUser = { ...data, username: newUsername, role: "user" };

    setUsers((prev) => [...prev, newUser]);

    alert(`Account created! Username: ${newUsername}`);
    navigate("/login");
  };




  /* ---------------- ADMIN LOGIN ---------------- */
  const handleAdminLogin = (data) => {
    const adminUser = {
      username: "ADMIN001",
      email: "iremideb82@gmail.com",
      password: "bello2008",
      role: "admin",
      name: "Administrator",
    };

    if (
      data.username === adminUser.username &&
      data.email === adminUser.email &&
      data.password === adminUser.password
    ) {
      setCurrentUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin/dashboard");
      return true;
    }

    alert("Invalid admin credentials");
    return false;
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ background: "#faf8f1" }}>
      {showNavbar && (
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login-choice" element={<LoginChoice />} />

        <Route
          path="/login"
          element={<Login 
            />}
        />
        <Route
        path="/admin-login"
        element={<AdminLogin 
         onAdminLogin ={handleAdminLogin}/>}
/>      
      

        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/dashboard"
          element={
              <Dashboard />
            
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/select-subjects" element={<SubjectSelectionPage />} />

        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;

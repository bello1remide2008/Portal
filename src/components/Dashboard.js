import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import AssignmentsPage from "./AssignmentPage";
import SubjectSelectionPage from "./SubjectSelectionPage";
import Updates from "./updates";
import ResultsPage from "./ResultPage";
import Subjects from "./Subjects";
import ChatCard from "./ChatCard";

const Dashboard = () => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("main");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profileImage");
    if (savedPhoto) {
      setHasPhoto(true);
      setProfileImage(savedPhoto);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
      setHasPhoto(true);
    };
    reader.readAsDataURL(file);
  };

  const userName = localStorage.getItem("userName") || "User";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activePage) {
      case "subjects":
        return <Subjects />;
      case "assignments":
        return <AssignmentsPage />;
      case "updates":
        return <Updates />;
      case "results":
        return <ResultsPage />;
      case "select-subjects":
        return <SubjectSelectionPage />;
      case "chat-box":
        return <ChatCard />;
      default:
        return (
          <div className="card-grid">
            <DashboardCard title="📖 Subjects" desc="View all subjects" onClick={() => setActivePage("subjects")} />
            <DashboardCard title="📚 Assignments" desc="Your homework & tasks" onClick={() => setActivePage("assignments")} />
            <DashboardCard title="📰 Updates" desc="School news & announcements" onClick={() => setActivePage("updates")} />
            <DashboardCard title="📊 Performance" desc="Check your results" onClick={() => setActivePage("results")} />
            <DashboardCard title="➕ Select Subjects" desc="Choose your registered subjects" onClick={() => setActivePage("select-subjects")} />
            <DashboardCard title="🧏‍♀️ Chat box" desc="Communicate with the head on any issues" onClick={() => setActivePage("chat-box")} />
          </div>
        );
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      {!hasPhoto ? (
        <div className="upload-first">
          <p>Please upload your profile photo to continue</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      ) : (
        <>
          {/* NAVBAR */}
          <nav className="dashboard-navbar">
            <div className="nav-left">
              <FaBars className="hamburger" onClick={toggleSidebar} />
              <div className="welcome-box">
                <h2>Hello, {userName} 👋</h2>
                <span>Welcome back to your dashboard</span>
              </div>
            </div>

            <div className="nav-right">
              <div className="theme-toggle" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </div>

              <label className="profile-upload">
                <img
                  src={profileImage || "/images/default-avatar.png"}
                  className="profile-pic"
                  alt="profile"
                />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </nav>

          {/* SIDEBAR */}
          <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <p onClick={() => { setActivePage("main"); setSidebarOpen(false); }}>🏠 Dashboard Home</p>
            <p onClick={() => { setActivePage("assignments"); setSidebarOpen(false); }}>📚 Assignments</p>
            <p onClick={() => { setActivePage("subjects"); setSidebarOpen(false); }}>📖 Subjects</p>
            <p onClick={() => { setActivePage("updates"); setSidebarOpen(false); }}>📰 Updates</p>
            <p onClick={() => { setActivePage("results"); setSidebarOpen(false); }}>📊 Results</p>
          </aside>

          {sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}

          {/* CONTENT */}
          <div className={`dashboard-content ${sidebarOpen ? "shift" : ""}`}>
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import books from "./books.jpeg";


const SubjectsPage = ({ navigate }) => {

  const [subjects, setSubjects] = useState([]);

  // Load subscribed subjects
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentSubjects")) || [];
    setSubjects(saved);
  }, []);

  return (
    <div className="subject-container">
      <h2>Your Subjects</h2>

      {subjects.length === 0 && (
        <p>You have not registered for any subjects.</p>
      )}

      <div className="card-grid">
        {subjects.map((subj, index) => (
          <DashboardCard
            key={index}
            title={subj}
            desc="Open subject assignments"
            image={books}
            onClick={() => navigate(`/assignments/${subj}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;

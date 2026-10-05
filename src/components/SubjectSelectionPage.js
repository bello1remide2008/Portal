import React, { useState, useEffect } from "react";
import SubjectSelectionCard from "./SubjectSelectionCard";
import "./SubjectSelectionPage.css";

const allSubjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Civic Education",
  "Economics",
  "Literature",
  "Government",
  "Geography",
  "Further Mathematics",
  "Computer Studies"
];

const SubjectSelectionPage = ({ navigate }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentSubjects")) || [];
    setSelectedSubjects(saved);
  }, []);

  // Toggle select/deselect subject
  const toggleSelect = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const saveSubjects = () => {
    localStorage.setItem("studentSubjects", JSON.stringify(selectedSubjects));
    alert("Subjects saved successfully!");
    navigate("/subjects"); // Redirect to subjects page
  };

  return (
    <div className="subject-select-page">
      <h2 className="subject-header">Select<span> Subjects</span> You Are Offering</h2>

      <div className="subject-grid">
        {allSubjects.map((subject, index) => (
          <SubjectSelectionCard
            key={index}
            subject={subject}
            isSelected={selectedSubjects.includes(subject)}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>

      <button className="save-btn" onClick={saveSubjects}>
        Save Subjects
      </button>
    </div>
  );
};

export default SubjectSelectionPage;

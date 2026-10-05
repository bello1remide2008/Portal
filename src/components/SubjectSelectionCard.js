import React from "react";
import "./SubjectSelectionCard.css";

const SubjectSelectionCard = ({ subject, isSelected, toggleSelect }) => {
  return (
    <div
      className={`subject-select-card ${isSelected ? "selected" : ""}`}
      onClick={() => toggleSelect(subject)}
    >
      <h3 className="subject-code">{subject}</h3>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelect(subject)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default SubjectSelectionCard;

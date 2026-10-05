
import React, { useState } from "react";
import "./SchoolCard.css";
import RegisterModal from "./RegisterModal";

const SchoolCard = ({ school, onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="school-card">
      <img
        src={school.image}
        alt={school.name}
        className="school-image"
      />
      <h3>{school.name}</h3>
      <p><strong>Location:</strong> {school.location}</p>
      <p><strong>Tuition:</strong> {school.tuition}</p>
      <p><srong>Description</srong>{school.description}</p>


      <button className="register-btn" onClick={handleOpenModal}>
        Register
      </button>

      {showModal && (
        <RegisterModal
          school={school}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SchoolCard;

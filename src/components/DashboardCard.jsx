import React from "react";
import "./DashboardCard.css";

const DashboardCard = ({ title, desc, image, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="card-content">
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
};

export default DashboardCard;

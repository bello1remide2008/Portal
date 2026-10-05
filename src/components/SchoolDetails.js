import React from "react";
import "./SchoolDetails.css";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";


const SchoolDetails = ({ school, onBack }) => {

  if (!school) {
    return <h2>School not found</h2>;
  } 

  return (

      <div className="school-detail">
         <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img src={school.image} alt={school.name} className="detail-img" />

      <div className="detail-content">
        <h1>{school.name}</h1>
        <p><strong>Location:</strong> {school.location}</p>
        <p>{school.description}</p>

        <Link to="/">
          <button className="back-btn">← Back to Home</button>
        </Link>
      </div>
      </motion.div>
    </div>
    
  );
};

export default SchoolDetails;

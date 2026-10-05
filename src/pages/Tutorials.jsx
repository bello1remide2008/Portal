// src/pages/Tutorials.jsx
import React, { useEffect, useState } from "react";
import SchoolCard from "../components/SchoolCard";
import { initialSchools } from "../components/initialSchools";

const STORAGE_KEY = "ikorodu_schools_v1";

function Tutorials() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSchools(JSON.parse(saved));
    } else {
      // first time: seed with initial data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSchools));
      setSchools(initialSchools);
    }
  }, []);

  // We pass a callback for when a registration completes (optional)
  const handleRegistered = (schoolId, registrationData) => {
    // for now just show an alert; later we can send to a backend
    alert(`Thanks ${registrationData.name}! You registered for ${schools.find(s => s.id === schoolId).name}`);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Tutorial Centers in Ikorodu</h2>
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {schools.map(s => (
          <SchoolCard key={s.id} school={s} onRegistered={handleRegistered} />
        ))}
      </div>
    </div>
  );
}

export default Tutorials;

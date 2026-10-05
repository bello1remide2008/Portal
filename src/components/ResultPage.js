import React, { useState, useEffect } from "react";
import "./ResultPage.css";

const ResultsPage = () => {
  // Load results from localStorage
  const [results, setResults] = useState(() => {
    return JSON.parse(localStorage.getItem("studentResults")) || [];
  });
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const allResults = JSON.parse(localStorage.getItem("results")) || [];

const myResults = allResults.filter(
  r => r.studentId === currentUser.username
);

  useEffect(() => {
    localStorage.setItem("studentResults", JSON.stringify(results));
  }, [results]);

  return (
    <div className="results-container">
      <h2 className="results-title">📊 Academic Performance</h2>
      <p className="results-subtitle">Below is your exam performance</p>

      {/* ------- RESULTS TABLE -------- */}
      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
          {myResults.map(r=>(
  <tr key={r.id}>
    <td>{r.subject}</td>
    <td>{r.ca}</td>
    <td>{r.exam}</td>
    <td>{r.total}</td>
  </tr>
))}

          </thead>

          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-results">
                  No results uploaded yet.  
                  <br />
                  Please check back later.
                </td>
              </tr>
            ) : (
              results.map((r, index) => (
                <tr key={index}>
                  <td>{r.subject}</td>
                  <td>{r.ca}</td>
                  <td>{r.exam}</td>
                  <td>{r.total}</td>
                  <td>{r.grade}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- SPACE FOR ADMIN INPUT LATER ---------- */}
      <div className="admin-note">
        <p>
          <strong>Admin Area:</strong>  
          You will later add result input fields here —  
          I will help you design a complete admin result upload panel.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;

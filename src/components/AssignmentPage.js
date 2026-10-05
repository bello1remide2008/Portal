import React, { useEffect, useState } from "react";

const AssignmentsPage = ({ subject }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`assign_${subject}`)) || [];
    setAssignments(data);
  }, [subject]);

  return (
    <div className="assignment-container">
      <h2>{subject} - Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <table className="assign-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, i) => (
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.deadline}</td>
                <td>{a.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignmentsPage;

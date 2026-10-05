import React from "react";
import "./Updates.css";

const Updates = () => {
  const calender = [
    {
      week: "Week 1",
      date: "5/1/2026",
      activity: "School Resumption & Orientation",
      note: "Students return to school, and welcome tesr",
    },
    {
      week: "Week 2",
      date: "12/1/2026",
      activity: "Normal Classes Begin",
      note: "Full academic work starts",
    },
    {
      week: "Week 3",
      date: "18/1/2026",
      activity: "School work continues",
      note: "Extensive classes",
    },
    {
      week: "Week 4",
      date: "25/1/2026",
      activity: "First CA test",
      note: "To determine the students performance so far",
    },
    {
      week: "Week 5",
      date: "2/2/2026",
      activity: "Sports Week",
      note: "Students have different activities to prepare for inter-house-sports",
    },
    {
      week: "Week 6",
      date: "7/2/2026",
      activity: "Mid-Term-Break",
      note: "All Students are expected to rest for a week away from school",
    },
    {
      week: "Week 7",
      date: "14/2/2026",
      activity: "School Activities Resumes",
      note: "Normal classes begins",
    },
    {
      week: "Week 8",
      date: "21/2/2026",
      activity: " Second CA Test ",
      note: "Second student assesement",
    },
    {
      week: "Week 9",
      date: "28/2/2026",
      activity: "Revision week",
      note: "Preparation for the exam",
    },
    {
      week: "Week 10",
      date: "7/3/2026",
      activity: "Examinations Begins",
      note: "Main exams begins",
    },
     {
      week: "Week 11",
      date: "14/3/2026",
      activity: "Examinations Conclusions",
      note: "Main exams continues",
    },
     {
      week: "Week 12",
      date: "21/3/2026",
      activity: "Vacation",
      note: "School closes for the term ",
    },
  ];
const [timetable, setTimetable] = useState([]);

useEffect(() => {
  setTimetable(JSON.parse(localStorage.getItem("timetable")) || []);
}, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="updates-container">
      <h1 className="updates-header">📅 School Term Timetable</h1>

      <div className="table-container">
        <table className="timetable">
          <thead>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Activity</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {calender.map((item, index) => (
              <tr key={index}>
                <td>{item.week}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.activity}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Updates;

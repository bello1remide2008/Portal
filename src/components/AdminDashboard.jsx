import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import "./AdminDashboard.css";

/* ================= UPLOAD RESULTS ================= */

const AdminContent = ({ active, selectedStudent }) => {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [editingId, setEditingId] = useState(null); 


  const [resultForm, setResultForm] = useState({
    subject: "",
    ca: "",
    exam: ""
  });

  const [timetable, setTimetable] = useState([]);
const [timeForm, setTimeForm] = useState({
  week:"",
  Date: "",
  Activities: "",
  Notes: ""
});
useEffect(() => {
  setTimetable(JSON.parse(localStorage.getItem("timetable")) || []);
}, []);


  const [assignForm, setAssignForm] = useState({
    subject: "",
    task: "",
    due: ""
  });

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setResults(JSON.parse(localStorage.getItem("results")) || []);
    setAssignments(JSON.parse(localStorage.getItem("assignments")) || []);
  }, []);

  const saveResults = (data) => {
    setResults(data);
    localStorage.setItem("results", JSON.stringify(data));
  };

  const saveAssignments = (data) => {
    setAssignments(data);
    localStorage.setItem("assignments", JSON.stringify(data));
  };

  const saveTimetable = (data) => {
  setTimetable(data);
  localStorage.setItem("timetable", JSON.stringify(data));
};

  const addResult = (e) => {
  e.preventDefault();
  if (!selectedStudent) return;

  // EDIT MODE
  if (editingId) {
    const updated = results.map(r =>
      r.id === editingId
        ? {
            ...r,
            ca: Number(resultForm.ca),
            exam: Number(resultForm.exam),
            total: Number(resultForm.ca) + Number(resultForm.exam),
          }
        : r
    );

    saveResults(updated);
    setEditingId(null);
    setResultForm({ subject: "", ca: "", exam: "" });
    return;
  }

  // ADD MODE
  const newItem = {
    id: Date.now(),
    studentId: selectedStudent.username,
    subject: resultForm.subject,
    ca: Number(resultForm.ca),
    exam: Number(resultForm.exam),
    total: Number(resultForm.ca) + Number(resultForm.exam),
  };

  saveResults([newItem, ...results]);
  setResultForm({ subject: "", ca: "", exam: "" });



    const updated = [newItem, ...results];
    saveResults(updated);
    setResultForm({ subject: "", ca: "", exam: "" });
  };
if(editingId){
  const updated = results.map(r =>
    r.id === editingId ? {...r, ...resultForm, total:+resultForm.ca + +resultForm.exam} : r
  );
  saveResults(updated);
  setEditingId(null);
}
  const addAssignment = (e) => {
    e.preventDefault();
    
    const newItem = { id: Date.now(), ...assignForm };
    const updated = [newItem, ...assignments];
    saveAssignments(updated);
    setAssignForm({ subject: "", task: "", due: "" });
  };
  return(
  <main className="admin-main">
 {active === "results" && selectedStudent && (
  
  <div className="result-box fadeIn">
  
    <h2>Results for {selectedStudent.username}</h2>

      
    <form onSubmit={addResult}>
      <input
        placeholder="Subject"
        value={resultForm.subject}
        onChange={e => setResultForm({ ...resultForm, subject: e.target.value })}
        required
        disabled={editingId !== null}
      />

      <input
        type="number"
        placeholder="CA"
        value={resultForm.ca}
        onChange={e => setResultForm({ ...resultForm, ca: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Exam"
        value={resultForm.exam}
        onChange={e => setResultForm({ ...resultForm, exam: e.target.value })}
        required
      />

     <button type="submit">
  {editingId ? "Update Result" : "Add Result"}
</button>

<button
  type="button"
  disabled={!resultForm.subject || !resultForm.ca || !resultForm.exam}
  onClick={() => {
    const chats = JSON.parse(localStorage.getItem("chats")) || [];
    chats.push({
      id: Date.now(),
      from: "admin",
      to: selectedStudent.username,
      text: `Your result for ${resultForm.subject} has been uploaded.`,
      time: new Date().toLocaleTimeString()
    });
    localStorage.setItem("chats", JSON.stringify(chats));
  }}
>
  Send Result
</button>


      
    </form>

    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>CA</th>
          <th>Exam</th>
          <th>Total</th>
          <th>Action</th>
          <th>Action </th>
        </tr>
      </thead>

      <tbody>
        {results
          .filter(r => r.studentId === selectedStudent.username)
          .map(r => {
            const total = Number(r.ca) + Number(r.exam);
            return (
              <tr key={r.id} className="slideIn">
                <td>{r.subject}</td>
                <td>{r.ca}</td>
                <td>{r.exam}</td>
                <td><strong>{total}</strong></td>
               <td>
  <button
    onClick={() => {
      setResultForm({
        subject: r.subject,
        ca: r.ca,
        exam: r.exam
      });
      setEditingId(r.id);
    }}
  >
    Edit
  </button>
</td>

<td>
  {editingId === r.id && (
    <button
      type="button"
      className="back-btn blink"
      onClick={() => {
        setEditingId(null);
        setResultForm({ subject: "", ca: "", exam: "" });
      }}
    >
      Back
    </button>
  )}
</td>

              </tr>
            );
          })}
      </tbody>
    </table>
  </div>


)};


{active === "updates" && (
  <div className="update-box fadeIn">
    <h2>Student Timetable / Calendar</h2>

    <form
      onSubmit={(e) => {
        e.preventDefault();

        const newItem = {
          id: Date.now(),
          ...timeForm
        };

        saveTimetable([newItem, ...timetable]);
        setTimeForm({ week: "",date:"", activities: "", note: "" });
      }}
    >
      <input
        placeholder="Week(e.g week 1)"
        value={timeForm.week}
        onChange={e => setTimeForm({ ...timeForm, day: e.target.value })}
        required
      />

      <input
        placeholder="date (e.g 10/1/2026)"
        value={timeForm.Date}
        onChange={e => setTimeForm({ ...timeForm, subject: e.target.value })}
        required
      />

    
      <input
        placeholder="Activity"
        value={timeForm.Activities}
        onChange={e => setTimeForm({ ...timeForm, time: e.target.value })}
        required
      />
        <input
        placeholder="a short note"
        value={timeForm.Notes}
        onChange={e => setTimeForm({ ...timeForm, time: e.target.value })}
        required
      />

      <button type="submit">Add to Timetable</button>
    </form>

      <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Date</th>
          <th>Activity</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {timetable.map(item => (
          <tr key={item.id} className="slideIn">
            <td>{item.week}</td>
            <td>{item.date}</td>
            <td>{item.activity}</td>
            <td>{item.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {active === "assignments" && (
        <div>
          <h2>Assignments</h2>

          <form onSubmit={addAssignment}>
            <input placeholder="Subject" value={assignForm.subject}
              onChange={e => setAssignForm({...assignForm, subject:e.target.value})} required />
            <input placeholder="Assignment" value={assignForm.task}
              onChange={e => setAssignForm({...assignForm, task:e.target.value})} required />
            <input type="date" value={assignForm.due}
              onChange={e => setAssignForm({...assignForm, due:e.target.value})} required />
            <button>Add</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Task</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.id}>
                  <td>{a.subject}</td>
                  <td>{a.task}</td>
                  <td>{a.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
/* ================= CHAT ================= */

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedStudent, SetSelectedStudent] =useState("")

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chats")) || [];
    setMessages(data.filter(m => m.to === "admin"));
  }, []);

  return (
    <div>
      <h2>Messages</h2>

      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.from}</strong>: {m.text} ({m.time})
        </div>
      ))}

      <form onSubmit={e => {
        e.preventDefault();
        const chats = JSON.parse(localStorage.getItem("chats")) || [];
        chats.push({
          id: Date.now(),
          from: "admin",
          to: selectedStudent.email,
          text: reply,
          time: new Date().toLocaleTimeString()
        });
        localStorage.setItem("chats", JSON.stringify(chats));
        setReply("");
      }}>
        <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Reply..." />
        <button>Send</button>
      </form>
    </div>
  );
};

/* ================= BLOG ================= */

const CreateBlog = () => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    link: "",
    image: ""
  });

  const handleBlogImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBlogForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveBlog = (e) => {
    e.preventDefault();
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = { id: Date.now(), ...blogForm };
    localStorage.setItem("blogs", JSON.stringify([newBlog, ...blogs]));
    setBlogForm({ title: "", content: "", link: "", image: "" });
  };

  return (
    <form onSubmit={saveBlog} className="form-grid">
      <input placeholder="Title" value={blogForm.title}
        onChange={e => setBlogForm({...blogForm, title:e.target.value})} required />
      <textarea placeholder="Content" value={blogForm.content}
        onChange={e => setBlogForm({...blogForm, content:e.target.value})} required />
      <input placeholder="Blog Link" value={blogForm.link}
        onChange={e => setBlogForm({...blogForm, link:e.target.value})} />
      <input type="file" accept="image/*" onChange={handleBlogImage} />
      <button>Add Blog</button>
    </form>
  );
};

/* ================= MAIN ADMIN DASHBOARD ================= */

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("students");
  const [blogs, setBlogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
 const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("role")) navigate("/login-choice");
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:3000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    if (active === "blogs") fetchBlogs();
  }, [active]);
const searchStudent = () => {
  const found = students.find(s => s.username === searchUsername);
  if (!found) {
    alert("Student not found");
    return;
  }
  setSelectedStudent(found);
};
  return (
    <div className="admin-wrap">
      <header className="admin-top">
        <FaBars
  className={`menu-icon ${sidebarOpen ? "spin" : ""}`}
  onClick={() => setSidebarOpen(!sidebarOpen)}
/>

        <h2>Admin Dashboard</h2>
      </header>



      <aside className={`admin-side ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => setActive("students")}>Student Data</li>
          <li onClick={() => setActive("results")}>Results</li>
          <li onClick={() => setActive("assignments")}>Assignments</li>
          <li onClick={() => setActive("blogs")}>Blogs</li>
          <li onClick={() => setActive("chat")}>Messages</li>
        </ul>
      </aside>

      <main className="admin-main">
        {(active === "results" || active === "assignments") && (
          <AdminContent active={active} selectedStudent={selectedStudent} />
        )}

        {active === "chat" && <ChatUI />}

      {active === "students" && (
  <div>
    <div className="search-box">
  <input
    placeholder="Enter Username"
    value={searchUsername}
    onChange={e => setSearchUsername(e.target.value)}
  />
  <button onClick={searchStudent}>Search</button>
</div>
    <h2>Student Data</h2>


    {/* ADD STUDENT FORM */}
    <form onSubmit={(e)=>{
      e.preventDefault();
      const updated = [...students, {
        id: Date.now(),
        username: e.target.username.value,
        name: e.target.name.value,
        className: e.target.className.value
      }];
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      e.target.reset();
    }}>
      <input name="username" placeholder="Username" required />
      <input name="name" placeholder="Full Name" required />
      <input name="className" placeholder="Class" />
      <button>Add Student</button>
    </form>

    {/* STUDENT TABLE */}
    {active === "students" && (
  <div className="students-grid">
    {students.map(st => (
      <div
        key={st.username}
        className="student-card"
        onClick={() => {
          setSelectedStudent(st);
          setActive("results");
        }}
      >
        <h3>{st.name || "Student"}</h3>
        <p>Username: {st.username}</p>
        <p>Class: {st.className || "Not set"}</p>
        <span className="enter-btn">Enter Results</span>
      </div>
    ))}
  </div>
)}

  </div>
)}


        {active === "blogs" && <CreateBlog />}
      </main>
    </div>
  );
};

export default AdminDashboard;

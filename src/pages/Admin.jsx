// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { initialSchools } from "../data/initialSchools";

const STORAGE_KEY = "ikorodu_schools_v1";

function Admin() {
  const [schools, setSchools] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", fees: "", description: "" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSchools(JSON.parse(saved));
    else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSchools));
      setSchools(initialSchools);
    }
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSchools(updated);
  };

  const handleAdd = () => {
    const newSchool = {
      id: Date.now(),
      name: form.name || "New School",
      location: form.location || "Ikorodu",
      fees: form.fees || "0",
      description: form.description || ""
    };
    const updated = [newSchool, ...schools];
    saveToStorage(updated);
    setForm({ name: "", location: "", fees: "", description: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this school?")) return;
    const updated = schools.filter(s => s.id !== id);
    saveToStorage(updated);
  };

  const startEdit = (s) => {
    setEditing(s.id);
    setForm({ name: s.name, location: s.location, fees: s.fees, description: s.description });
  };

  const submitEdit = () => {
    const updated = schools.map(s => s.id === editing ? { ...s, ...form } : s);
    saveToStorage(updated);
    setEditing(null);
    setForm({ name: "", location: "", fees: "", description: "" });
  };

  const resetSeed = () => {
    if (!window.confirm("Reset to initial Ikorodu schools?")) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSchools));
    setSchools(initialSchools);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
        <input placeholder="Fees" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        {!editing ? (
          <button onClick={handleAdd} style={{ marginLeft: 8 }}>Add School</button>
        ) : (
          <button onClick={submitEdit} style={{ marginLeft: 8 }}>Save Edit</button>
        )}
        <button onClick={resetSeed} style={{ marginLeft: 8 }}>Reset Seed Data</button>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {schools.map(s => (
          <div key={s.id} style={{ border: "1px solid #e5e7eb", padding: 10, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{s.name}</strong> <div style={{ color: "#6b7280" }}>{s.location} • ₦{s.fees}</div>
            </div>
            <div>
              <button onClick={() => startEdit(s)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

const db = require("../database/db");

class Student {

  // CREATE STUDENT (REGISTER)
  static async create(data) {
    const { full_name, email, password, level, role } = data;

    const sql = `
      INSERT INTO students (full_name, email, password, level, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      full_name,
      email,
      password,
      level,
      role || "student"
    ]);

    return result;
  }

  // GET STUDENT BY EMAIL (LOGIN)
  static async findByEmail(email) {
    const sql = `SELECT * FROM students WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }

  // GET STUDENT BY ID
  static async findById(id) {
    const sql = `SELECT * FROM students WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  // GET ALL STUDENTS (ADMIN)
  static async findAll() {
    const sql = `
      SELECT id, full_name, email, level, role, status, created_at
      FROM students
      ORDER BY created_at DESC
    `;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // COUNT STUDENTS (DASHBOARD STATS)
  static async count() {
    const sql = `SELECT COUNT(*) AS total FROM students`;
    const [rows] = await db.execute(sql);
    return rows[0].total;
  }

  // UPDATE STUDENT STATUS (SUSPEND / ACTIVATE)
  static async updateStatus(id, status) {
    const sql = `UPDATE students SET status = ? WHERE id = ?`;
    const [result] = await db.execute(sql, [status, id]);
    return result;
  }
}

module.exports = Student;

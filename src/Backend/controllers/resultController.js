exports.uploadResult = async (req, res) => {
  const { student_id, subject, score, term, session } = req.body;

  await db.query(
    "INSERT INTO results (student_id, subject, score, term, session) VALUES (?,?,?,?,?)",
    [student_id, subject, score, term, session]
  );

  res.json({ message: "Result uploaded successfully" });
};

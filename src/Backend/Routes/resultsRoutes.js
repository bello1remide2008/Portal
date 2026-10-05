const express = require("express");
const router = express.Router();
const {
  uploadResult,
  getStudentResults
} = require("../controllers/resultController");

const adminOnly = require("../MiddleWare/adminOnly");

router.post("/", adminOnly, uploadResult);
router.get("/:studentId", getStudentResults);

module.exports = router;

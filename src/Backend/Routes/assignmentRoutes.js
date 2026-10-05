const router = require("express").Router();
const {
  createAssignment,
  getAssignments
} = require("../controllers/assignmentController");

const adminOnly = require("../MiddleWare/adminOnly");

router.post("/", adminOnly, createAssignment);
router.get("/", getAssignments);

module.exports = router;

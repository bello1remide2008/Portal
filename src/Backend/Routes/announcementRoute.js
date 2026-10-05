const router = require("express").Router();
const adminOnly = require("../MiddleWare/adminOnly");
const {
  postAnnouncement,
  getAnnouncements
} = require("../controllers/announcementController");

router.post("/", adminOnly, postAnnouncement);
router.get("/", getAnnouncements);

module.exports = router
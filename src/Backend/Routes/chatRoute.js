const router = require("express").Router();
const {
  sendMessage,
  getMessages
} = require("../controllers/chatController");

router.post("/", sendMessage);
router.get("/:userId", getMessages);

module.exports = router;

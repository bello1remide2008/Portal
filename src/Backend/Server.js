const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/assignments", require("./Routes/assignmentRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

app.listen(3000, () => console.log("Server running on port 3000"));


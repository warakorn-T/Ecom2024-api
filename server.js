const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");

// const authRouter = require("./routes/auth");
// const categoryRouter = require("./routes/category");

// midddleware
app.use(morgan("dev")); // ดูค่าเวลารีเฟรช browser
app.use(express.json({ limit: "20mb" })); // ให้ express อ่านค่าจาก body ได้
app.use(cors());

// app.use("/api", authRouter);
// app.use("/api", categoryRouter);
readdirSync("./routes").map((c) => app.use("/api", require("./routes/" + c)));

// Router
// app.get("/api", (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);
//   res.send("jukkru");
// });

app.listen(5000, () => console.log("Server is running on port 5000"));

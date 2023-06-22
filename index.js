const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
dotenv.config();

const foodsRoutes = require("./routes/foods");
const authRoutes = require("./routes/auth");

const { DB_HOST, PORT } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/avatars", express.static(path.join(__dirname, 'public', "avatars")))

app.use("/api", foodsRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(DB_HOST)
  .then((res) => {
    console.log(`Server work on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use((__, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

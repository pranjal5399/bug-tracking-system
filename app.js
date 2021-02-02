const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const url = "mongodb://localhost/bug-tracker";
//const url = process.env.MONGO_URI;
const app = express();

//Require routes
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

//Connecting to database
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//Middlewares
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());

app.get("/api/", (req, res) => {
  res.json("Home Route");
});

app.use("/api/projects/", projectRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/admin/", adminRoutes);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

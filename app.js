const express = require("express");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const config = require("config");
const MONGO_URI = config.get("mongoURI");
const url = "mongodb://localhost/bug-tracker";
//const url = MONGO_URI;
const app = express();

//Require routes
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");

//Connecting to database
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Home Route");
});

app.use("/api/projects/", projectRoutes);
app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

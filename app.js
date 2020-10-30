const express = require("express");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const url = "mongodb://localhost/bug-tracker";
const app = express();

//Require routes
const projectRoutes = require("./routes/project.routes");

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

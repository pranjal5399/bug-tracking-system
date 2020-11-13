const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
//const MONGO_URI = config.get("mongoURI");
require("dotenv").config();
const cors = require("cors");
/*
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
*/

const PORT = process.env.PORT || 8080;
//const url = "mongodb://localhost/bug-tracker";
const url = process.env.MONGO_URI;
const app = express();

// PASSPORT CONFIGURATION
/*
app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

//Require routes
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

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
/*
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
*/
app.get("/api/", (req, res) => {
  res.json("Home Route");
});

app.use("/api/projects/", projectRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);

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

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { auth } = require("../middleware");

router.get("/", auth, projectController.getAllProjects);
router.post("/", projectController.addProject);

module.exports = router;

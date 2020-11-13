const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../middleware");

router.get("/", auth, userController.getUser);

module.exports = router;

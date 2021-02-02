const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");
const { auth, isAdmin } = require("../middleware");

router.get("/users", auth, isAdmin, userController.getAllUser);
router.get("/users/:id", auth, isAdmin, userController.getUser);
router.put("/users/:id", auth, isAdmin, adminController.assignRole);

module.exports = router;

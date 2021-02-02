const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const ticketController = require("../controllers/ticket.controller");
const { auth, isAdmin } = require("../middleware");

router.get("/", auth, isAdmin, projectController.getAllProjects);
router.post("/", auth, isAdmin, projectController.addProject);
router.get("/:project_id", auth, isAdmin, projectController.getOneProject);
router.put("/:project_id", auth, isAdmin, projectController.updateProject);
router.delete("/:project_id", auth, isAdmin, projectController.deleteProject);

//router.get("/:project_id/tickets/", auth, ticketController.getAllTickets);
router.get(
  "/:project_id/tickets/:ticket_id",
  auth,
  ticketController.getOneTicket
);

router.post("/:project_id/tickets/", auth, ticketController.addOneTicket);

router.put(
  "/:project_id/tickets/:ticked_id",
  auth,
  ticketController.updateTicketStatus
);

module.exports = router;

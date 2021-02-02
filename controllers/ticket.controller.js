const Ticket = require("../models/ticket");
const Project = require("../models/project");

exports.getOneTicket = async (req, res) => {
  try {
    const ticket_id = req.params.ticket_id;
    const ticket = await Ticket.findById(ticket_id);

    return res.status(200).json({ ticket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.addOneTicket = async (req, res) => {
  try {
    const { name, description, image, type, priority } = req.body;
    const submitter = req.user.user;
    const project = req.params.project_id;
    const newTicket = new Ticket({
      name,
      project,
      type,
      priority,
      description,
      submitter,
      image,
    });
    await newTicket.save();

    const foundProject = await Project.findById(project);

    foundProject.tickets.push(newTicket.id);
    await foundProject.save();

    return res.status(200).json({ ticket: newTicket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

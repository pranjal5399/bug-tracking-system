const Project = require("../models/project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length !== 0) {
      return res.status(200).json({ projects: projects });
    } else {
      return res.status(404).json({ message: "No project found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = new Project({ title, description });
    await newProject.save();

    return res.status(200).json({ project: newProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

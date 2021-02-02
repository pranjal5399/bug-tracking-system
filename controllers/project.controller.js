const Project = require("../models/project");
const multer = require("multer");

// let upload = multer({ storage: storage }).fields([{ name: "video" }]);
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       let dir = __dirname.dirpath + "/assets/";

//       if (!fs.existsSync(dir)) {
//           fs.mkdirSync(dir);
//       }
//       cb(null, dir)
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.originalname)
//   }
// });

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length !== 0) {
      return res.status(200).json({ projects: projects });
    } else {
      return res.status(404).json({ msg: "No project found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { title, description, manager, developers } = req.body;
    const newProject = new Project({ title, description, manager, developers });
    await newProject.save();

    return res.status(200).json({ project: newProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const { title, description, manager, developers } = req.body;

    const project = await Project.findById(project_id);
    project.title = title;
    project.description = description;
    project.manager = manager;
    project.developers = developers;

    const updatedProject = await project.save();

    return res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const project = await Project.findById(project_id);
    if (!project) return res.status(404).json({ msg: "No project found" });
    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project_id = req.params.project_id;
    await Project.findByIdAndDelete(project_id);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

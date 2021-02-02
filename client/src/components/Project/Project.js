import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
const Project = () => {
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        const res = await axios.get("/projects/", config);
        setProjects(res.data.projects);
        console.log(res.data.projects);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h3>Projects</h3>
      <Button onClick={() => history.push("/projects/add")} className="m-4">
        Add Project
      </Button>
      <ListGroup>
        {projects.map((project) => (
          <ListGroup.Item key={project.id}>{project.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Project;

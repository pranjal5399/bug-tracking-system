import axios from "axios";
import React, { useState, useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/projects/");
        setProjects(res.data.projects);
        //console.log(res.data.projects);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return <div>{JSON.stringify(projects)}</div>;
};

export default Project;

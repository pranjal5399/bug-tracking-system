import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Project from "./components/Project/Project";
import AddProject from "./components/Project/AddProject";
import Tickets from "./components/Tickets/Tickets";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/SpecialRoutes/ProtectedRoute/ProtectedRoute";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
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
      const tokenRes = await axios.post("/auth/isValidToken", null, config);
      if (tokenRes.data) {
        const userRes = await axios.get("/user", config);
        setUserData({ token, user: userRes.data });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Layout>
              <ProtectedRoute exact path="/home" component={Home} />
              <ProtectedRoute exact path="/projects" component={Project} />
              <ProtectedRoute
                exact
                path="/projects/add"
                component={AddProject}
              />
              <ProtectedRoute exact path="/tickets" component={Tickets} />
              <ProtectedRoute exact path="/profile" component={Profile} />
            </Layout>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

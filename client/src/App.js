import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/NavBar";
import Home from "./components/Home/Home";
import UserContext from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Project from "./components/Project/Project";

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
      const tokenRes = await axios.post("/auth/isValidToken", null);
      //console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await axios.get("/user");
        setUserData({ token, user: userRes.data });
        // console.log(userData);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar>
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/projects" component={Project} />
            </Switch>
          </Navbar>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

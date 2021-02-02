import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";

const LandingPage = () => {
  const [key, setKey] = useState("login");
  return (
    <>
      <h1>Issue Tracking System</h1>
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="justify-content-center"
        >
          <Tab eventKey="login" title="Login">
            <Signin />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <Signup />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default LandingPage;

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Navbar, Nav, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Home = ({ children }) => {
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      <Navbar fixed="top" sticky="top" style={{ backgroundColor: "#060b26" }}>
        <Navbar.Brand style={{ color: "white" }}>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end nav-text">
          <Nav className="mr-2">
            <Link style={{ color: "white" }} onClick={logout}>
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>{children}</Col>
      </Row>

      <div>Home</div>
    </>
  );
};

export default Home;

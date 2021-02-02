import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import { Button, Form } from "react-bootstrap";

const Signup = () => {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const body = {};
    body["name"] = e.target.name.value;
    body["email"] = e.target.email.value;
    body["password"] = e.target.password.value;

    if (body.name !== "" && body.email !== "" && body.password !== "") {
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
        const res = await axios.post("/auth/signup/", body, config);
        setUserData({
          token: res.data.token,
          user: res.data.user,
        });
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Enter all fields");
    }
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;

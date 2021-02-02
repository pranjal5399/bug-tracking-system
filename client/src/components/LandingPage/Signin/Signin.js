import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import { Button, Form } from "react-bootstrap";

const Signin = () => {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const body = {};
    body["email"] = e.target.email.value;
    body["password"] = e.target.password.value;

    if (body.email !== "" && body.password !== "") {
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
        const res = await axios.post("/auth/login/", body, config);
        console.log(res.data);
        setUserData({
          token: res.data.token,
          user: res.data.user,
        });
        localStorage.setItem("auth-token", res.data.token);
        history.push("/home");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Enter all fields");
    }
  };

  return (
    <div className="justify-content-left">
      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signin;

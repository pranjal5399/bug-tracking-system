import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import axios from "axios";
import {
  Button,
  Modal,
  Avatar,
  CssBaseline,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../LoginModal/styles";

const modal = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const SignupModal = () => {
  const formRef = React.useRef();
  const classes = useStyles();
  const { setUserData } = useContext(UserContext);
  const [modalStyle] = useState(modal);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitEventHandler = async (e) => {
    e.preventDefault();

    const body = {};
    body["name"] = e.target.name.value;
    body["email"] = e.target.email.value;
    body["password"] = e.target.password.value;

    if (body.name !== "" && body.email !== "" && body.password !== "") {
      try {
        const res = await axios.post("/auth/signup/", body);
        setUserData({
          token: res.data.token,
          user: res.data.user,
        });
        localStorage.setItem("token", res.data.token);
        handleClose();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Enter all fields");
    }
  };
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Sign Up
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={modalStyle} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              ref={formRef}
              className={classes.form}
              noValidate
              onSubmit={submitEventHandler}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => formRef.current.reportValidity()}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default SignupModal;

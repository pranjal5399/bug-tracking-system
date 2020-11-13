import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import {
  Button,
  Modal,
  Avatar,
  CssBaseline,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

const modal = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const LoginModal = () => {
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
    body["email"] = e.target.email.value;
    body["password"] = e.target.password.value;

    if (body.email !== "" && body.password !== "") {
      try {
        const res = await axios.post("/auth/login/", body);
        setUserData({
          token: res.data.token,
          user: res.data.user,
        });
        localStorage.setItem("auth-token", res.data.token);
        handleClose();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Enter all fields");
    }
  };
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* <div style={modalStyle} className={classes.paper}> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={modalStyle} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={submitEventHandler}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
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
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default LoginModal;

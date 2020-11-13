import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import UserContext from "../../../context/UserContext";

const AuthOptions = () => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      toker: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  const projects = () => {
    history.push("/projects");
  };
  return (
    <>
      {userData.user ? (
        <>
          {/* <Typography variant="button" display="block">
            Hi, {userData.user.name.split(" ")[0]}
          </Typography> */}
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
          <Button color="inherit" onClick={projects}>
            Projects
          </Button>
        </>
      ) : (
        <>
          <LoginModal />
          <SignupModal />
        </>
      )}
    </>
  );
};

export default AuthOptions;

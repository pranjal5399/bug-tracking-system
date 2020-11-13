import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import UserContext from "../../../context/UserContext";

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      toker: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <>
      {userData.user ? (
        <>
          <Typography variant="button" display="block">
            Hi, {userData.user.name.split(" ")[0]}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
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

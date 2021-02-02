import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return userData.user && userData.user.role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/error" />
          );
        }}
      />
    </div>
  );
};

export default AdminRoute;

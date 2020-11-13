import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return userData.user ? <Component {...props} /> : <Redirect to="/" />;
        }}
      />
    </div>
  );
};

export default ProtectedRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateLogin = ({ component: Component, auth, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth === false) {
        return <Component {...props} />;
      } else if (role === "user") {
        return <Redirect to="/delivery" />;
      } else if (role === "admin") {
        return <Redirect to="/dashboard" />;
      }
    }}
  />
);

export default PrivateLogin;

import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateLogin = ({ component: Component, auth, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth === false) {
        console.log("hi");
        return <Component {...props} />;
      } else if (role === "user") {
        console.log("user");
        return <Redirect to="/delivery" />;
      } else if (role === "admin") {
        console.log("admin");
        return <Redirect to="/dashboard" />;
      }
    }}
  />
);

export default PrivateLogin;

// <>
//         {(() => {
//           console.log(roleStatus, "role from me");
//           if (roleStatus === "user") {
//             <Redirect to="/delivery" />;
//           }
//           if (roleStatus === "admin") {
//             <Redirect to="/dashboard" />;
//           }
//         })()}
//       </>

import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ContentUser from "./ContentUser";
import UserLogin from "./Users/UserLogin";
import { AuthContext, RoleContext } from "../context/AuthContext";
function Users() {
  const { loginStatus, setLoginStatus } = useContext(AuthContext);
  const { roleStatus, setRoleStatus } = useContext(RoleContext);

  const handleLogout = () => {
    setLoginStatus(false);
    setRoleStatus("");
    localStorage.removeItem("token");
    localStorage.removeItem("u_role");
  };
  return (
    <nav>
      <ContentUser />
      {/* <Button onClick={handleLogout}>Logout1</Button> */}
    </nav>
  );
}

export default Users;

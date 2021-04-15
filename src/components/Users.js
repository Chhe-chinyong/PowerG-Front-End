import React, { useContext } from "react";
import ContentUser from "./ContentUser";
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
    </nav>
  );
}

export default Users;

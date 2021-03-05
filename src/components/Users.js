import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import ContentUser from "./ContentUser";
import UserLogin from "./Users/UserLogin";
import { AuthContext } from "../context/AuthContext";
function Users() {
  const { loginStatus, setLoginStatus } = useContext(AuthContext);
  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("token");
  };
  return (
    <nav>
      <ContentUser />
      <Button onClick={handleLogout}>Logout1</Button>
    </nav>
  );
}

export default Users;

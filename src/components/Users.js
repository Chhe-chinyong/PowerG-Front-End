import React from "react";
import { Button } from "react-bootstrap";
import ContentUser from "./ContentUser";
import UserLogin from "./Users/UserLogin";
function Users() {
  return (
    <nav>
      <ContentUser />
      <UserLogin />
    </nav>
  );
}

export default Users;

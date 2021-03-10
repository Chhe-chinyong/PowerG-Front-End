import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { RoleContext } from "../context/AuthContext";
// Component
import { UserLogin } from "./Users/UserLogin";
function Home() {
  const { roleStatus, setRoleStatus } = useContext(RoleContext);
  return (
    <nav>
      <UserLogin />
    </nav>
  );
}

export default Home;

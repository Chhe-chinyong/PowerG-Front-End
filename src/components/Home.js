import React from "react";
import { Button } from "react-bootstrap";

// Component
import { UserLogin } from "./Users/UserLogin";
function Home() {
  return (
    <nav>
      <UserLogin />
    </nav>
  );
}

export default Home;

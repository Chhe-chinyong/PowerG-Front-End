import React from "react";
import { Button } from "react-bootstrap";
function DashBoard({ title }) {
  return (
    <nav>
      <Button>{title}</Button>
    </nav>
  );
}

export default DashBoard;

import React from "react";
import { Button } from "react-bootstrap";
import DashBoardTable from "../components/DashBoard/DashBoardTable";
function DashBoard({ title }) {
  return (
    <nav>
      <DashBoardTable />
    </nav>
  );
}

export default DashBoard;

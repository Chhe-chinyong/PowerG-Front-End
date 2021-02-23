import React, { useState } from "react";
import { Layout } from "antd";
const { Header } = Layout;
function HeaderBar({ title }) {
  return (
    <Header
      style={{
        background: "white",
        width: "100%",
        display: "flex",
        height: "72px",
        alignItems: "center",
        paddingLeft: "40px",
        height: "72px",
      }}
    >
      <h5 style={{ margin: "0" }}>{title}</h5>
    </Header>
  );
}

export default HeaderBar;

// {
//   /* <h5 style={{ margin: "0" }}>{title}</h5> */
// }

// display: "flex",
// height: "72px",
// alignItems: "center",
// paddingLeft: "40px",

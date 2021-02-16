import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function HeaderBar({ title }) {
  const [head, setHead] = useState("");
  return (
    <Header style={{ background: "white", height: "72px", width: "100%" }}>
      {title}
    </Header>
  );
}

export default HeaderBar;

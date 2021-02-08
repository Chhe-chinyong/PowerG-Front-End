import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/favicon.ico";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  CalendarOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

function NavBar() {
  return (
    <header>
      <nav className="nav-bar">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible theme="light">
            <Menu defaultSelectedKeys={["1"]} mode="inline">
              {/* Logo */}

              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              {/* Item */}
              <Item key="1" className="no" icon={<DesktopOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Item>

              <Item key="2" className="no" icon={<CalendarOutlined />}>
                <Link to="/products">Proudct</Link>
              </Item>

              <Item key="3" className="no" icon={<FileSearchOutlined />}>
                <Link to="/report">Report</Link>
              </Item>

              <Item key="4" className="no" icon={<UserOutlined />} title="User">
                <Link to="/users">Users</Link>
              </Item>
            </Menu>
          </Sider>
        </Layout>
      </nav>
    </header>
  );
}

export default NavBar;

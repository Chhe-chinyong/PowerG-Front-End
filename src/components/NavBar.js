import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/favicon.ico";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  CalendarOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

function NavBar({ title, setTitle }) {
  const handleClick = (e) => {
    setTitle(e.target.innerHTML);
  };
  return (
    <header>
      <nav className="nav-bar">
        <Menu defaultSelectedKeys={["1"]} mode="inline">
          {/* Logo */}

          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          {/* Item */}
          <Item key="1" className="icon" icon={<DesktopOutlined />}>
            <Link to="/dashboard" onClick={handleClick}>
              Dashboard
            </Link>
          </Item>

          <Item key="2" className="icon" icon={<CalendarOutlined />}>
            <Link to="/products" onClick={handleClick}>
              Proudct
            </Link>
          </Item>

          <Item key="3" className="icon" icon={<FileSearchOutlined />}>
            <Link to="/report" onClick={handleClick}>
              Report
            </Link>
          </Item>

          <Item key="4" className="icon" icon={<UserOutlined />} title="User">
            <Link to="/users" onClick={handleClick}>
              Users
            </Link>
          </Item>
        </Menu>
      </nav>
    </header>
  );
}

export default NavBar;

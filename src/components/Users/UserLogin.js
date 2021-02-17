import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import logo from "../../images/favicon.ico";
import { Table, Button, Space, Form, Input, InputNumber } from "antd";

const Item = function UserLogin() {
  return (
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "white" }}
      //   #F2F3F6
    >
      <div className="userContainer">
        {/* Logo */}
        <div className="userLogo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Form */}
      </div>
    </div>
  );
};

export default UserLogin;

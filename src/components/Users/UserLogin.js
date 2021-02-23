import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import logo from "../../images/favicon.ico";
import { Button, Form, Input } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Item } = Form;
function UserLogin() {
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

        <Form
        //   name="basic"
        //   initialValues={{
        //     remember: true,
        //   }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        >
          {/*Username*/}
          <Item
            name={"username"}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="default size"
              placeholder="Username"
              prefix={
                <UserOutlined style={{ color: "gray", opacity: "50%" }} />
              }
              className="userInput"
            />
          </Item>
          {/*Password*/}
          <Item
            name={"password"}
            // label="Username"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="default size"
              placeholder="Password"
              prefix={
                <LockOutlined style={{ color: "gray", opacity: "50%" }} />
              }
              className="userInput"
            />
          </Item>

          {/* Submit */}
          <Item className="userSubmit">
            <Button htmlType="submit" className="userSubmitButton">
              LOG IN
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;

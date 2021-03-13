import React, { useContext, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import logo from "../../images/favicon.ico";
import { Button, Form, Input, message } from "antd";
import {
  AuthContext,
  RoleContext,
  UsernameContext,
} from "../../context/AuthContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Item } = Form;

export const UserLogin = () => {
  // State
  const { loginStatus, setLoginStatus } = useContext(AuthContext);
  const { roleStatus, setRoleStatus } = useContext(RoleContext);
  const { userNameStatus, setUsernameStatus } = useContext(UsernameContext);
  let history = useHistory();
  // EventHandler
  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const result = await axios.post(`http://165.22.252.116/api/user/login`, {
        name: username,
        password: password,
      });
      console.log("result", result);
      const role = result.data.role;
      console.log("role", role);
      const token = result.data.token;
      const userId = result.data.user_log_id;
      console.log(token);
      setLoginStatus(true);
      setRoleStatus(role);
      setUsernameStatus(username);
      localStorage.setItem("token", token);
      localStorage.setItem("u_role", role);
      localStorage.setItem("u_id", userId);
      localStorage.setItem("u_username", username);
      // history.push("/dashboard");
    } catch (error) {
      console.log(error.response);
      const messageError = error.response.data.message;
      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
      setLoginStatus(false);
    }
  };
  return (
    <div className="cover">
      <div className="userContainer">
        {/* Logo */}
        <div className="userLogo">
          <img src={logo} alt="Logo" />
        </div>
        {/* Form */}

        <Form
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          className="FormCard"
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
};

// export default UserLogin;

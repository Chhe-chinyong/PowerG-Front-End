import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import logo from "../../images/favicon.ico";
import { Button, Form, Input, message } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Item } = Form;
function UserLogin() {
  // EventHandler
  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const result = await axios.post(`http://165.22.252.116/api/user/login`, {
        name: username,
        password: password,
      });
      console.log("result", result);
    } catch (error) {
      const messageError = error.response.data.message;
      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };
  return (
    <div
      className="cover"
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

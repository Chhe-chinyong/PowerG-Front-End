import React from "react";
import { Button, Form, Input, message } from "antd";

import axios from "axios";
import "antd/dist/antd.css";
const { Item } = Form;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function ContentUserAdd({
  setVisible,

  setTrigger,
}) {


  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const username = values.username;
    const password = values.password;
    const contact = values.contact;
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/api/user/register`,
        {
          name: username,
          password: password,
          contact: contact,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(result);

      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
      setVisible(false)
      setTrigger(true);
      setTrigger(false);
      
    } catch (error) {
      const messageError = error.response.data.message;

      // console.log(messageError);
      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };
  // EventHandler
  const onFinishFailed = (errorInfo) => {
    console.log("Failed hey", errorInfo);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Form
        // onSubmit={handleSubmit}
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ textAlign: "center" }}
      >
        {/* Username */}
        <Item
          name={"username"}
          label="Username"
          rules={[
            { transform: (value) => value.trim() },
            {
              whitespace: true,
              message: "No whitespace",
            },
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 6,
              message: "Username must contain 6 letters",
            },
          ]}
        >
          <Input />
        </Item>

        {/* Password */}
        <Item
          name={"password"}
          label="Password"
          maxLength={20}
          minLength={6}
          rules={[
            {
              required: true,
              message: "please input your password!",
            },
            {
              whitespace: true,
              message: "No whitespace",
            },
          ]}
        >
          <Input.Password />
        </Item>
        {/* Contact */}

        <Item
          label="Contact"
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "please input your phone number!",
            },
            {
              max: 10,
              message: "No exceed 10 digit",
            },
            {
              min: 9,
              message: "At least 9 digit",
            },
            {
              whitespace: true,
              message: "No whitespace",
            },
          ]}
          maxLength={10}
          name={"contact"}
        >
          <Input />
        </Item>

        {/* Submit */}
        <Item className="footerAddUser">
          <Button className="btnSubmitUser" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </Item>
      </Form>
    </>
  );
}

export default ContentUserAdd;


import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
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
const ContentUserEdit = ({ setVisible, user, visible1 }) => {
  // Object
  const { user_name, user_password, user_contact } = user;

  // State
  // const [username, setUsername] = useState(Username);

  // EventHandler
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Form
        // onSubmit={handleSubmit}
        {...layout}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        style={{ textAlign: "center" }}
      >
        {/* Username */}
        <Item
          name={"username"}
          label="Username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={user_name} key={user.key} />
        </Item>

        {/* Password */}
        <Item
          name={"password"}
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password defaultValue={user_password} key={user.key} />
        </Item>
        {/* Contact */}
        <Item
          name={"contact"}
          label="Contact"
          rules={[
            {
              required: true,
              message: "Please input your contact!",
            },
          ]}
        >
          <Input defaultValue={user_contact} key={user.key} />
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
};

export default ContentUserEdit;

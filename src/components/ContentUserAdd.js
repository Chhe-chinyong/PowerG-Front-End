import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Form,
  Input,
  message,
  InputNumber,
  Modal,
} from "antd";
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

function ContentUserAdd({ setVisible }) {
  // State
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const username = values.username;
    const password = values.password;
    const contact = values.contact;
    try {
      const result = await axios.post(
        `http://165.22.252.116/api/user/register`,
        {
          name: username,
          password: password,
          // contact: contact,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      message.success({
        content: result,
        duration: "1000",
        className: "custom-class",
      });
    } catch (error) {
      message.error({
        content: "this is Error " + error,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };
  // EventHandler
  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
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
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Item>

        {/* Password */}
        <Item
          name={"password"}
          label="Password"
          rules={[
            {
              required: true,
              message: "please input your password!",
            },
          ]}
        >
          <Input.Password />
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

// const onFinishFailed = (values) => {
//   console.log(values);
// };
// const handleSubmit = (e) => {
//   e.preventDefault();

//   const user = {
//     name: this.state.name,
//   };

//   axios
//     .post(`165.22.252.116/api/user/register`, { user })
//     .then((res) => {
//       console.log(res);
//       console.log(res.data);
//     })
//     .catch(console.log("errro"));
//   // action=""
//   //     method="POST"
//   console.log("hey");
// };

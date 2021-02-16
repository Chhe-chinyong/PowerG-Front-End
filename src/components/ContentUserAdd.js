import React, { useState } from "react";
import { Table, Button, Space, Form, Input, InputNumber } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.css";
const { Item } = Form;
function ContentUserAdd() {
  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const username = values.username;
    const password = values.password;
    try {
      const result = await axios.post(`165.22.252.116/api/user/register`, {
        username: username,
        password: password,
      });
      console.log(result);
    } catch (error) {
      console.log("this is error message" + error);
    }
  };
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
  return (
    <>
      <Form
        // onSubmit={handleSubmit}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
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
          <Input />
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
          <Input />
        </Item>

        {/* Submit */}
        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
}

export default ContentUserAdd;

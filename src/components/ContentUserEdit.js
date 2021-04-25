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
const ContentUserEdit = ({ setVisible, user, visible1, setTrigger }) => {
  // Object
  const { user_name, user_password, contact } = user;
  const id = user.user_id;

  // State
  // const [userValue, setUserValue] = useState({
  //   name: user_name,
  //   password: user_password,
  //   contact: contact,
  // });

  // EventHandler
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const username = values.username;
      const password = values.password;
      const contact = values.contact;

      const result = await axios.put(
        `${process.env.REACT_APP_DOMAIN}/api/user/updateinfo/${id}`,
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

        // { headers: { "Access-Control-Allow-Origin": "*" } }
      );

      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
      setTrigger(true);
      setTrigger(false);
      setVisible(false);
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
    <>
      <Form
        // onSubmit={handleSubmit}
        {...layout}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        style={{ textAlign: "center" }}
        // initialValues={{ username: user_name, contact: contact }}
      >
        {/* Username */}
        <Item
          name={"username"}
          label="Username"
          rules={[
            {
              required: true,
            },
            {
              min: 6,
              message: "Username must contain 6 letters",
            },
          ]}
        >
          <Input
            defaultValue={user_name}
            // value="sadsad"
            // onChange={(e) => setUserValue({ username: e.target.value })}
            key={id}
            placeholder="username"
          />
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
          <Input.Password key={id} placeholder="***********" />
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
            {
              max: 10,
              message: "No exceed 10 digit",
            },
            {
              min: 9,
              message: "At least 9 digit",
            },
          ]}
        >
          <Input defaultValue={contact} key={id} placeholder="0123928472" />
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

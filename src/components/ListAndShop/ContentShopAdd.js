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

function ContentShopAdd({
  setVisible,

  setTrigger,
}) {
  // State
  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");

  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const shopName = values.shopName.toUpperCase();
    const shopContact = values.shopContact;
    const shopAddress = values.shopAddress;
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/shop/register`,
        {
          shopName: shopName,
          shopContact: shopContact,
          shopAddress: shopAddress,
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
          name={"shopName"}
          label="shopName"
          rules={[
            { transform: (value) => value.trim() },
            {
              whitespace: true,
              message: "No whitespace",
            },
            {
              required: true,
              message: "Please input shop's name!",
            },
          ]}
        >
          <Input />
        </Item>

        {/* Password */}
        <Item
          name={"shopContact"}
          label="shopContact"
          maxLength={20}
          minLength={6}
          rules={[
            {
              required: true,
              message: "please input shop's contact!",
            },
            {
              whitespace: true,
              message: "No whitespace",
            },
          ]}
        >
          <Input />
        </Item>
        {/* Address */}
        <Item
          name={"shopAddress"}
          label="shopAddress"
          rules={[
            { transform: (value) => value.trim() },
            {
              whitespace: true,
              message: "No whitespace",
            },
            {
              required: true,
              message: "Please input shop's address!",
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

export default ContentShopAdd;

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

//   name={"contact"}
//   label="Contact"
//   rules={[
//     {
//       required: true,
//       message: "Please input your contact!",
//     },
//   ]}
// >
//   <Input />

// <Input
//             addonBefore={prefixSelector}
//             style={{
//               width: "100%",
//             }}
//           />

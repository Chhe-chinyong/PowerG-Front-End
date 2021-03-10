import React, { useEffect } from "react";
import axios from "axios";
import logo from "../images/favicon.ico";
import bg from "../images/qr-submit.png";
import { Button, Form, Input, message, Col, Row, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Item } = Form;
const layout = {
  labelCol: {
    span: 8,
  },

  // wrapperCol: {
  //   span: 5,
  // },
};
function QrCode({ match }) {
  const pro_id = match.params.pro_id;
  const user_id = localStorage.getItem("u_id");
  useEffect(() => {}, []);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setVisible(false);
  };
  //Event
  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const shop_owner = values.shop_owner;

    try {
      const result = await axios.post(
        `http://165.22.252.116/package/addpackagetodeliveryman`,
        {},
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );

      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });

      // setVisible(false);
    } catch (error) {
      console.log(error);
      const messageError = error.response.data.message;
      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };
  return (
    // <div className="qr-container">
    //   <Form {...layout} onFinish={onFinish} className="qrCode">
    // {/* Package'Id*/}
    // <Item
    //   name={"product_id"}
    //   label="Package's Id"
    //   className="disabledByMe"
    //   rules={[
    //     {
    //       whitespace: true,
    //       message: "No whitespace",
    //     },
    //   ]}
    // >
    //   <Input defaultValue={pro_id} />
    // </Item>

    // {/*  DeliveryMan'Id */}
    // <Item
    //   name={"delivery_id"}
    //   label="Delivery man's Id"
    //   className="disabledByMe"
    //   rules={[
    //     {
    //       whitespace: true,
    //       message: "No whitespace",
    //     },
    //   ]}
    // >
    //   <Input defaultValue={user_id} />
    // </Item>

    //     {/* Submit */}
    //     <Item className="qrSubmit">
    //       <Button
    //         className="btnSubmitUser btnSubmitQr"
    //         type="primary"
    //         htmlType="submit"
    //       >
    //         Submit
    //       </Button>
    //       <Button type="default" onClick={handleCancel}>
    //         Cancel
    //       </Button>
    //     </Item>
    //   </Form>
    // </div>

    <div className="qr-cover">
      <div className="userContainer">
        {/* Logo */}
        <div className="qr-code-logo">
          <img src={logo} alt="Logo" />
          <h5>បញ្ចាក់ការដឹក</h5>
        </div>
        {/* Form */}
        <Form
          onFinish={onFinish}
          {...layout}
          //   onFinishFailed={onFinishFailed}
          className="FormCard"
        >
          {/* Package'Id*/}
          <Item
            name={"product_id"}
            label="Package's Id:"
            className="disabledByMe"
            rules={[
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input defaultValue={pro_id} />
          </Item>

          {/*  DeliveryMan'Id */}
          <Item
            name={"delivery_id"}
            label="Delivery man's Id:"
            className="disabledByMe"
            rules={[
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input defaultValue={user_id} />
          </Item>

          {/* Submit */}
          <Item className="userSubmit">
            <Button htmlType="submit" className="userSubmitButton">
              Submit
            </Button>
          </Item>
        </Form>
      </div>
      <img src={bg} alt="background" className="bg" />
    </div>
  );
}

export default QrCode;

//  {/*Username*/}
//  <Item
//  name={"username"}
//  rules={[
//    {
//      required: true,
//      message: "Please input your username!",
//    },
//  ]}
// >
//  <Input
//    placeholder="default size"
//    placeholder="Username"
//    prefix={
//      <UserOutlined style={{ color: "gray", opacity: "50%" }} />
//    }
//    className="userInput"
//  />
// </Item>
// {/*Password*/}
// <Item
//  name={"password"}
//  rules={[
//    {
//      required: true,
//      message: "Please input your password!",
//    },
//  ]}
// >
//  <Input.Password
//    placeholder="default size"
//    placeholder="Password"
//    prefix={
//      <LockOutlined style={{ color: "gray", opacity: "50%" }} />
//    }
//    className="userInput"
//  />
// </Item>

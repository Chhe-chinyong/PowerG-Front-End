import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import logo from "../images/favicon.ico";
import bg from "../images/qr-submit.png";

import { Button, Form, Input, message, Col, Row, Select } from "antd";
import { UserOutlined, LeftOutlined ,LeftSquareOutlined ,RollbackOutlined ,LockOutlined, HomeOutlined  } from "@ant-design/icons";
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
    // console.log("this is " + values.username);
    // console.log("this is " + values.password);
    // const shop_owner = values.shop_owner;
    if (values.product_id === undefined) {
      var pro_id = match.params.pro_id;
    }
    if (values.delivery_id === undefined) {
      var user_id = localStorage.getItem("u_id");
    }

    const list_id = localStorage.getItem("listId");
    console.log(list_id);
    console.log(pro_id);
    console.log(user_id);
    // if (!list_id) {
    //   message.error({
    //     content: "" + "Please create a list before you scan",
    //     duration: 5,
    //     className: "UserErrorMessage",
    //   });
    //   return;
    // }
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/packageList/addList`,
        {
          listId: list_id,
          deliveryManId: user_id,
          package: pro_id,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      if (!list_id) {
        localStorage.setItem("listId", result.data.listId);
        console.log(localStorage.getItem("listId"));
      }

      // localStorage.setItem("listId", listId);
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
    <div className="qr-cover">
      <div className="userContainer">
        
        {/* Logo */}
        <div className="qr-code-logo">
          <div class="iconQR icons-list ">
          {/* <LeftOutlined  class="iconQR-icon"/>  */}
          {/* <Button className=" backQR" icon={<LeftOutlined/>}>
              
          </Button> */}
          </div>

        {/* <HomeOutlined /> */}
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <h5 className="khmer-font">បញ្ចាក់ការដឹក</h5>
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
            {/* <Button className=" backQR" icon={<LeftOutlined/>}>
                back
            </Button> */}
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

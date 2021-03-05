import React, { useState, useContext } from "react";
import axios from "axios";
import PDF from "./PDF";
import { ProductContext } from "../../context/AuthContext";
import "antd/dist/antd.css";
import { Button, Form, Input, message, Col, Row, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
const { Item } = Form;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
function ContentProductAdd({ setTrigger, setVisible }) {
  //State
  const [redirect, setRedirect] = useState(false);
  //useContext
  const {
    packageId,
    date,
    location,
    shopPhone,
    receiverPhone,
    setPackageId,
    setDate,
    setLocation,
    setShopPhone,
    setReceiverPhone,
  } = useContext(ProductContext);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  //Event
  const onFinish = async (values) => {
    console.log("this is " + values.username);
    console.log("this is " + values.password);
    const shop_owner = values.shop_owner;
    const cust_name = values.cust_name;
    const cust_location = values.cust_location;
    const cust_phone = values.cust_phone;
    const pro_price = values.pro_price;
    const payment_method = values.payment_method;
    const service_fee = values.service_fee;
    const service_paid_by = values.service_paid_by;
    try {
      const result = await axios.post(
        `http://165.22.252.116/package/addpackage`,
        {
          shop_owner: shop_owner,
          cust_name: cust_name,
          cust_location: cust_location,
          cust_phone: cust_phone,
          pro_price: pro_price,
          payment_method: payment_method,
          service_fee: service_fee,
          service_paid_by: service_paid_by,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      console.log(result);

      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
      setTrigger(true);
      setTrigger(false);
      setRedirect(true);
      // setVisible(false);
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
  return (
    <div>
      {!redirect ? (
        <Form
          // onSubmit={handleSubmit}
          {...layout}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          style={{ textAlign: "center" }}
        >
          {/* Username */}
          <Item
            name={"shop_owner"}
            label="Shop_owner"
            rules={[
              { transform: (value) => value.trim() },
              {
                whitespace: true,
                message: "No whitespace",
              },
              {
                required: true,
                message: "Please input your shop_owner!",
              },
            ]}
          >
            <Input />
          </Item>

          {/* Password */}
          <Item
            name={"cust_name"}
            label="Customer's name"
            rules={[
              {
                required: true,
                message: "please input your customer name!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            name={"cust_phone"}
            label="Customer's Phone"
            rules={[
              {
                required: true,
                message: "please input your customer name!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            name={"pro_price"}
            label="Pro_Price"
            rules={[
              {
                required: true,
                message: "please input your customer name!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            name={"payment_method"}
            label="payment_method"
            rules={[
              {
                required: true,
                message: "please input your payment_method!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            name={"servie_fee"}
            label="servie_fee"
            rules={[
              {
                message: "please input your servie_fee!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input defaultValue="1$" value="1" />
          </Item>

          <Item
            name={"serviec_paid_by"}
            label="serviec_paid_by"
            rules={[
              {
                required: true,
                message: "please input your servie_fee!",
              },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            label="Location"
            style={{ textAlign: "left" }}
            rules={[
              {
                required: true,
                message: "please input location!",
              },
            ]}
            name={"cust_location"}
          >
            <Input.TextArea />
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
      ) : (
        <PDF />
      )}
    </div>
  );
}

export default ContentProductAdd;

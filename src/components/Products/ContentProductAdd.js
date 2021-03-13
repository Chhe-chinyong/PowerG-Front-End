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
function ContentProductAdd({ setTrigger, setVisible, redirect, setRedirect }) {
  //State
  // const [redirect, setRedirect] = useState(false);
  const [productData, setProductData] = useState({});
  const [packageId, setPackageId] = useState();
  //useContext
  // const {
  //   packageId,
  //   date,
  //   location,
  //   shopPhone,
  //   receiverPhone,
  //   setPackageId,
  //   setDate,
  //   setLocation,
  //   setShopPhone,
  //   setReceiverPhone,
  // } = useContext(ProductContext);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  //Event
  const onFinish = async (values) => {
    const shop_owner = values.shop_owner;
    const cust_name = values.cust_name;
    const cust_location = values.cust_location;
    const cust_phone = values.cust_phone;
    const pro_price = values.pro_price;
    var payment_method = values.payment_method;
    var service_fee = values.service_fee;
    var service_paid_by = values.service_paid_by;
    console.log(values);
    if (values.service_fee === undefined) {
      service_fee = 4000;
    }
    if (values.service_paid_by === undefined) {
      service_paid_by = "Transferer";
    }
    if (values.payment_method === undefined) {
      payment_method = "COD";
    }

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
      setPackageId(result.data.package_id);
      setTrigger(true);
      setTrigger(false);
      setRedirect(true);
      setProductData({
        shop_owner: shop_owner,
        cust_name: cust_name,
        cust_location: cust_location,
        cust_phone: cust_phone,
        pro_price: pro_price,
        payment_method: payment_method,
        service_fee: service_fee,
        service_paid_by: service_paid_by,
      });
      // setVisible(false);
    } catch (error) {
      console.log(error);
      // console.log("error", error.response);
      const messageError = error.response.data.message;

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
            label="Pro_Price ($)"
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
            name={"service_fee"}
            label="service_fee (៛)"
            rules={[
              // {
              //   message: "please input your servie_fee!",
              // },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            <Input defaultValue={4000} />
          </Item>

          <Item
            name={"service_paid_by"}
            label="service_paid_by"
            rules={[
              // {
              //   required: true,
              //   message: "please input your servie_fee!",
              // },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
            style={{ textAlign: "left" }}
          >
            <Select
              defaultValue="Transferer"
              style={{ width: 116 }}
              onChange={handleChange}
            >
              <Option value="Transferer">Transferer</Option>
              <Option value="Receiver">Receiver</Option>
            </Select>
          </Item>
          <Item
            style={{ textAlign: "left" }}
            name={"payment_method"}
            label="payment_method"
            rules={[
              // {
              //   required: true,
              //   message: "please input your payment_method!",
              // },
              {
                whitespace: true,
                message: "No whitespace",
              },
            ]}
          >
            {/* <Input /> */}
            <Select
              defaultValue="COD"
              style={{ width: 116 }}
              onChange={handleChange}
            >
              <Option value="COD">COD</Option>
              <Option value="Paid">Paid</Option>
            </Select>
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
        <PDF productData={productData} package_id={packageId} />
      )}
    </div>
  );
}

export default ContentProductAdd;

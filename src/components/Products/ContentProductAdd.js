import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import PDF from "./PDF";
import { ProductContext } from "../../context/AuthContext";
import "antd/dist/antd.css";
import {
  Button,
  Form,
  Input,
  message,
  Col,
  Row,
  Select,
  AutoComplete,
  InputNumber,
} from "antd";
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
  const [productData, setProductData] = useState({});
  const [packageId, setPackageId] = useState();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [codValue, setCOD] = useState("");
  const [transfererValue, setTransferer] = useState("");
  const [changeNumber, setChangeNumber] = useState();
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  //UseEffect
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/getAllShops`,
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      const allData = result.data.data;

      setData(allData);
    };
    fetchItem();
  }, []);

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : () => {
            const regex = new RegExp(`^${value}`, "i");
            const store = data.sort().filter((v) => regex.test(v.shopName));

            // setValue(store);
            const send = store.map((data) => {
              return {
                value: data.shopName,
              };
            });

            return send;
          }
    );
  };

  const onSelect = (data) => {};

  const onChange = (data) => {
    setValue(data);
  };
  const handleChange = (value) => {
    setServiceFee(value);
  };
  const handleChangeCOD = (value) => {
    setCOD(value);
  };

  const handleChangeTransferer = (value) => {
    setTransferer(value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChangeNumber = (value) => {
    console.log(value);
    setChangeNumber(value);
    console.log(changeNumber);
  };
  //Event
  const onFinish = async (values) => {
    const shop_owner = values.shop_owner;
    const cust_name = values.cust_name;
    const cust_location = values.cust_location;
    const cust_phone = values.cust_phone;
    const pro_price = values.pro_price;
    var payment_method = values.payment_method;
    // var service_fee = values.service_fee;
    // var service_fee = serviceFee;
    // var store_fee = serviceFee;
    var cod = codValue;
    var transferer = transfererValue;
    var service_paid_by = values.service_paid_by;

    // if (values.service_fee === undefined) {
    //   //  setServiceFee(1)
    //   store_fee = 1;
    // }
    if (values.service_paid_by === undefined) {
      // service_paid_by = "Transferer";
      transferer = "Transferer";
    }
    if (values.payment_method === undefined) {
      // payment_method = "COD";
      cod = "COD";
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/package/addpackage`,
        {
          shop_owner: shop_owner,
          cust_name: cust_name,
          cust_location: cust_location,
          cust_phone: cust_phone,
          pro_price: pro_price,
          payment_method: cod,
          service_fee: values.service_fee,
          service_paid_by: transferer,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

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
        payment_method: cod,
        service_fee: values.service_fee,
        service_paid_by: transferer,
      });

      // setVisible(false);
    } catch (error) {
      const messageError = error.response.data.message;

      message.error({
        content: "this " + messageError,
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
            {/* <Input /> */}
            <AutoComplete
              options={options}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
              placeholder="Input here"
            />
            {/* {data.map((data) => {
                <Option key={data.id} value={data.value}>
                  {data.shopName}
                </Option>;
              })} */}

            {/* {options.map((option) => (
              <Option key={option.id} value={option.value}>
                {option.shopName}
              </Option>
            ))} */}
          </Item>

          {/* Password */}
          <Item
            name={"cust_name"}
            label="Customer's name"
            rules={[
              {
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
                message: "please input your product price!",
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
            label="service_fee ($)"
            style={{ textAlign: "left" }}
            rules={[
              {
                required: true,
                message: "please input your servie_fee!",
              },
              // {
              //   whitespace: true,
              //   message: "No whitespace",
              // },
            ]}
          >
            <InputNumber min={0} />
          </Item>

          <Item
            name={"service_paid_by"}
            label="service_paid_by"
            rules={[
              // {
              //   required: true,
              //   message: "please input your servie_paid_by!",
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
              onChange={handleChangeTransferer}
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
              onChange={handleChangeCOD}
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
        <PDF
          productData={productData}
          package_id={packageId}
          className="PdfFinal"
        />
      )}
    </div>
  );
}

export default ContentProductAdd;

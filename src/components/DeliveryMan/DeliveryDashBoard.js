import React, { useState, useEffect } from "react";
import { Form, Table, Select, Button, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import DeliveryHeader from "../DeliveryMan/DeliveryHeader";
import axios from "axios";
import { getAllByDisplayValue } from "@testing-library/dom";
import { FileAddOutlined } from "@ant-design/icons";
const { Option } = Select;

function DeliveryDashBoard() {
  // const data = [
  //   {
  //     key: "1",
  //     productId: "000001",
  //     location: "New York No. 1 Lake Park",
  //     contact: "012394858",
  //     price: "3.5",
  //     status: "ON GOING",
  //   },
  //   {
  //     key: "2",
  //     productId: "000002",
  //     location: "New York No. 1 Lake Park",
  //     contact: "099384757",
  //     price: "3.5",
  //     status: "ON GOING",
  //   },
  //   {
  //     key: "3",
  //     productId: "000003",
  //     location: "New York No. 1 Lake Park",
  //     contact: "012394858",
  //     price: "3.5",
  //     status: "ON GOING",
  //   },
  //   {
  //     key: "4",
  //     productId: "000004",
  //     location: "New York No. 1 Lake Park",
  //     contact: "099384757",
  //     price: "3",
  //     status: "ON GOING",
  //   },
  //   {
  //     key: "5",
  //     productId: "000005",
  //     location: "New York No. 1 Lake Park",
  //     contact: "099384757",
  //     price: "3",
  //     status: "ON GOING",
  //   },
  //   {
  //     key: "6",
  //     productId: "000006",
  //     location: "New York No. 1 Lake Park",
  //     contact: "012394858",
  //     price: "3.5",
  //     status: "ON GOING",
  //   },
  // ];
  // state
  const [total, setTotal] = useState(0);
  const [listId, setListId] = useState();
  const [initialValue, setInitialValue] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [visible, setVisible] = useState(false);

  // useRef
  // const statusRef = useRef(null);
  //UseEffect
  useEffect(() => {
    const listId = localStorage.getItem("listId");
    setListId(listId);
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/packageList/getListById/${listId}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(result);
      const allData = result.data.data;
      setInitialValue(allData);
    };
    fetchItem();
  }, []);

  const generateList = async () => {
    const listId = localStorage.getItem("listId");
    // if (listId) {
    //   return console.log("u have already generate list");
    // }
    // const uuid_store = await uuidv4();
    // localStorage.setItem("listId", uuid_store.substring(0, 12));
    // // return console.log(uuid_store.substring(0, 8));
  };
  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (visible) => {
    console.log(visible);
    setVisible(visible);
    console.log(visible);
  };

  function checkStatus(values) {
    values.forEach((value) => {
      if (value.status === "ON GOING") {
        console.log("please change all status whether success or unsuccess");

        throw {
          response: {
            data: {
              message: "please change all status whether success or unsuccess",
            },
          },
        };
      }
    });
  }
  const onFinish = async () => {
    try {
      console.log("data", initialValue);
      checkStatus(initialValue);
      if (!localStorage.getItem("listId")) {
        throw {
          response: {
            data: {
              message: "please scan product in order to create list",
            },
          },
        };
      }
      const data = initialValue;
      const result = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/package/finalUpdate`,
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("data", initialValue);
      console.log(result);
      localStorage.removeItem("listId");
      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
    } catch (error) {
      console.log("error:", error);
      // console.log("error", error.response);
      const messageError = error.response.data.message;

      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };

  const onFinishFailed = () => {
    message.error({
      content: "" + "failed",
    });
  };
  const columns = [
    {
      title: "PRODUCT ID",
      dataIndex: "package_id",
      key: "package_id",
      className: "columns",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "LOCATION",
    //   dataIndex: "location",
    //   key: "location",
    //   className: "columns",
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (address) => (
    //     <Tooltip placement="topLeft" title={address}>
    //       {address}
    //     </Tooltip>
    //   ),
    // },
    {
      title: "CONTACT",
      dataIndex: "cust_phone",
      key: "cust_phone",
      className: "columns",
    },
    {
      title: "PRICE",
      dataIndex: "pro_price",
      key: "pro_price",
      className: "columns",
      render: (record) => {
        return <span className="priceDelivery">${record}</span>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      className: "columns",

      // Testing
      render: (text, record) => {
        console.log("reocrd", record);
        if (record.status === "ON GOING") {
          console.log("hey on going");
          return (
            <>
              <Select
                style={{
                  width: 100,
                  color: "#bdc3c7",
                  fontSize: "0.6rem",
                }}
                defaultValue="ON GOING"
                // ref={statusRef}
                onChange={(value) => {
                  // handleChange(text, record);
                  console.log("value", value);
                  console.log("record", record);
                  // Set key to state
                  // setKeyIndex(record.key);
                  const preStatus = record.status;
                  console.log("pre", preStatus);
                  var price;

                  if (value === "SUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hey");
                    setTotal(total + price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }
                  if (value === "UNSUCCESS") {
                    trigger ? setTrigger(false) : setTrigger(true);
                    // trigger === true ? setTrigger(false) : setTrigger(true);
                  }
                  if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hi ");
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  if (preStatus === "SUCCESS" && value === "ON GOING") {
                    price = parseFloat(record.price);
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  console.log(record);
                  // Change status to data
                  record.status = value;
                }}
              >
                <Option
                  value="ON GOING"
                  style={{
                    color: "#bdc3c7",
                    fontSize: "0.6rem",
                  }}
                >
                  ON GOING
                </Option>
                <Option
                  value="SUCCESS"
                  // className="SUCCESS"
                  style={{
                    color: "#52c41a",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  SUCCESS
                </Option>
                <Option
                  value="UNSUCCESS"
                  style={{
                    color: "#ff4d4f",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  UNSUCCESS
                </Option>
              </Select>
            </>
          );
        } else if (record.status === "UNSUCCESS") {
          console.log("hey UNSUCCESS");
          return (
            <>
              <Select
                style={{
                  width: 100,
                  color: "red",
                  fontSize: "0.6rem",
                }}
                onChange={(value) => {
                  // handleChange(text, record);
                  console.log("value", value);
                  console.log("record", record);
                  // Set key to state
                  // setKeyIndex(record.key);
                  const preStatus = record.status;
                  console.log(preStatus);
                  var price;

                  if (value === "SUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hey");
                    setTotal(total + price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hi ");
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  if (preStatus === "SUCCESS" && value === "ON GOING") {
                    price = parseFloat(record.price);
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  console.log(record);
                  // Change status to data
                  record.status = value;
                }}
              >
                <Option
                  value="ON GOING"
                  style={{
                    color: "#bdc3c7",
                    fontSize: "0.6rem",
                  }}
                >
                  ON GOING
                </Option>
                <Option
                  value="SUCCESS"
                  // className="SUCCESS"
                  style={{
                    color: "#52c41a",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  SUCCESS
                </Option>
                <Option
                  value="UNSUCCESS"
                  style={{
                    color: "#ff4d4f",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  UNSUCCESS
                </Option>
              </Select>
            </>
          );
        } else if (record.status === "SUCCESS") {
          console.log("hey success");
          return (
            <>
              <Select
                style={{
                  width: 100,
                  color: "#52c41a",
                  fontSize: "0.6rem",
                }}
                // defaultValue="ON GOING"
                // ref={statusRef}
                onChange={(value) => {
                  // handleChange(text, record);
                  console.log("value", value);
                  console.log("record", record);
                  // Set key to state
                  // setKeyIndex(record.key);
                  const preStatus = record.status;
                  console.log(preStatus);
                  var price;

                  if (value === "SUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hey");
                    setTotal(total + price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
                    price = parseFloat(record.price);
                    console.log("hi ");
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  if (preStatus === "SUCCESS" && value === "ON GOING") {
                    price = parseFloat(record.price);
                    setTotal(total - price);
                    trigger ? setTrigger(false) : setTrigger(true);
                  }

                  console.log(record);
                  // Change status to data
                  record.status = value;
                }}
              >
                <Option
                  value="ON GOING"
                  style={{
                    color: "#bdc3c7",
                    fontSize: "0.6rem",
                  }}
                >
                  ON GOING
                </Option>
                <Option
                  value="SUCCESS"
                  // className="SUCCESS"
                  style={{
                    color: "#52c41a",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  SUCCESS
                </Option>
                <Option
                  value="UNSUCCESS"
                  style={{
                    color: "#ff4d4f",
                    fontWeight: "bold",
                    fontSize: "0.6rem",
                  }}
                >
                  UNSUCCESS
                </Option>
              </Select>
            </>
          );
        }
      },
    },
  ];

  return (
    <div>
      {/* {console.log(data)}
      {console.log(total)} */}

      <DeliveryHeader />
      <div className="content">
        <div className="contentHeaderWrap">
          <p className="content-header">TO BE DELIVER </p>
          <Button
            size="default"
            className="generateList"
            icon={<FileAddOutlined />}
            onClick={generateList}
          >
            Generate
          </Button>
        </div>

        <Table
          columns={columns}
          // dataSource={data}
          dataSource={initialValue}
          // scroll={{ y: 500 }}
          scroll={{ x: "max-content", y: 600 }}
          pagination={false}
          style={{ padding: "0 1rem" }}
        />
      </div>
      {/* Amount is dynamic value */}
      <div className="total-container">
        <p>
          TOTAL AMOUNT:{}
          <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
            ${total}{" "}
          </span>{" "}
        </p>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Button
            type="primary"
            size="default"
            htmlType="submit"
            className="total-button"
          >
            Submit
          </Button>
          <Button>Cancel</Button>
        </Form>
      </div>
    </div>
  );
}

export default DeliveryDashBoard;

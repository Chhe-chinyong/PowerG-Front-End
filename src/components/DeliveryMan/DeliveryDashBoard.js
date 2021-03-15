import React, { useState, useRef, useEffect } from "react";
import { Form, Table, Tag, Space, Select, Button, message } from "antd";
import DeliveryHeader from "../DeliveryMan/DeliveryHeader";
import axios from "axios";
import { getAllByDisplayValue } from "@testing-library/dom";
const { Option } = Select;
// const columns = [
//   {
//     title: "PRODUCT ID",
//     dataIndex: "productId",
//     key: "productId",
//     className: "columns",
//     // width: 100,
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "LOCATION",
//     dataIndex: "location",
//     key: "location",
//     className: "columns",
//   },
//   {
//     title: "CONTACT",
//     dataIndex: "contact",
//     key: "contact",
//     className: "columns",
//   },
//   {
//     title: "PRICE",
//     dataIndex: "price",
//     key: "price",
//     className: "columns",
//     render: (record) => {
//       return <span>${record}</span>;
//     },
//   },
//   {
//     title: "STATUS",
//     dataIndex: "status",
//     key: "status",
//     className: "columns",
//     render: (status) => (
//       <>
//         {(() => {
//           <Select
//             defaultValue="Transferer"
//             style={{ width: 116 }}
//             onChange={handleChange}
//           >
//             <Option value="Transferer">Transferer</Option>
//             <Option value="Receiver">Receiver</Option>
//           </Select>;
//           // if (status === "UNSUCCESS")
//           //   return (
//           //     <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
//           //       UNSUCCESS
//           //     </span>
//           //   );
//           // if (status === "ON GOING")
//           //   return (
//           //     <span style={{ color: "#1890ff", fontWeight: "bold" }}>
//           //       ON GOING
//           //     </span>
//           //   );
//           // return (
//           //   <span style={{ color: "#52c41a", fontWeight: "bold" }}>
//           //     SUCCESS
//           //   </span>
//           // );
//         })()}
//       </>
//     ),
//   },
// ];
// const data = [
//   {
//     key: "1",
//     productId: "000001",
//     location: "New York No. 1 Lake Park",
//     contact: "012394858",
//     price: "3.5",
//     status: "SUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3.5",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "1",
//     productId: "000001",
//     location: "New York No. 1 Lake Park",
//     contact: "012394858",
//     price: "3.5",
//     status: "SUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "1",
//     productId: "000001",
//     location: "New York No. 1 Lake Park",
//     contact: "012394858",
//     price: "3.5",
//     status: "SUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3.5$",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "5",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "4",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "New York No. 1 Lake Park",
//     contact: "099384757",
//     price: "3.5",
//     status: "UNSUCCESS",
//   },
//   {
//     key: "2",
//     productId: "000002",
//     location: "AEONII, sen sok city",
//     contact: "099384757",
//     price: "3.5",
//     status: "UNSUCCESS",
//   },
//   // {
//   //   key: "2",
//   //   productId: "000002",
//   //   location: "New York No. 1 Lake Park",
//   //   contact: "099384757",
//   //   price: "3.5$",
//   //   status: "UNSUCCESS",
//   // },
//   // {
//   //   key: "2",
//   //   productId: "000002",
//   //   location: "New York No. 1 Lake Park",
//   //   contact: "099384757",
//   //   price: "3.5$",
//   //   status: "UNSUCCESS",
//   // },
//   // {
//   //   key: "2",
//   //   productId: "000002",
//   //   location: "New York No. 1 Lake Park",
//   //   contact: "099384757",
//   //   price: "3.5$",
//   //   status: "UNSUCCESS",
//   // },
//   // {
//   //   key: "2",
//   //   productId: "000002",
//   //   location: "New York No. 1 Lake Park",
//   //   contact: "099384757",
//   //   price: "3.5$",
//   //   status: "SUCCESS",
//   // },
// ];

function DeliveryDashBoard() {
  const data = [
    {
      key: "1",
      productId: "000001",
      // location: "New York No. 1 Lake Park",
      contact: "012394858",
      price: "3.5",
      status: "ON GOING",
    },
    {
      key: "2",
      productId: "000002",
      // location: "New York No. 1 Lake Park",
      contact: "099384757",
      price: "3.5",
      status: "ON GOING",
    },
    {
      key: "3",
      productId: "000003",
      // location: "New York No. 1 Lake Park",
      contact: "012394858",
      price: "3.5",
      status: "ON GOING",
    },
    {
      key: "4",
      productId: "000002",
      // location: "New York No. 1 Lake Park",
      contact: "099384757",
      price: "3",
      status: "UNSUCCESS",
    },
    {
      key: "5",
      productId: "000002",
      // location: "New York No. 1 Lake Park",
      contact: "099384757",
      price: "3",
      status: "UNSUCCESS",
    },
    {
      key: "6",
      productId: "000001",
      // location: "New York No. 1 Lake Park",
      contact: "012394858",
      price: "3.5",
      status: "SUCCESS",
    },
  ];
  // state
  const [total, setTotal] = useState(0);
  const [colorStatus, setColorStatus] = useState("#1890ff");
  const [initialValue, setInitialValue] = useState(data);
  const [trigger, setTrigger] = useState(false);
  // useRef
  // const statusRef = useRef(null);
  //UseEffect
  useEffect(() => {
    console.log("initialValue", initialValue);
  }, []);

  function handleChange(text, record, value) {
    // console.log(`selected ${value.productId}`);
    console.log("text", text);
    console.log("record", record);

    // console.log(colorStatus);
    // console.log(value);
    // console.log((statusRef.current.props.style.color = "red"));
    if (value == "UNSUCCESS") {
      console.log("hi");
      setColorStatus("#ff4d4f");
    }
    if (value == "ON GOING")
      if (value == "SUCCESS") {
        // setColorStatus("#1890ff");
        return (
          <Option
            value="SUCCESS"
            style={{
              color: "#52c41a",
              fontWeight: "bold",
              fontSize: "0.6rem",
            }}
          >
            SUCCESS
          </Option>
        );
      }

    // setColorStatus("#52c41a");
  }

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
      const result = await axios.post(
        `http://165.22.252.116/list`,
        {
          data: initialValue,
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
      dataIndex: "productId",
      key: "productId",
      className: "columns",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   // title: "LOCATION",
    //   // dataIndex: "location",
    //   // key: "location",
    //   // className: "columns",
    // },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      className: "columns",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
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
      render: (text, record) => (
        <>
          <Select
            size="small"
            defaultValue="ON GOING"
            style={{
              width: 90,
              // color: colorStatus,
              fontSize: "0.6rem",
            }}
            // ref={statusRef}
            onChange={(value) => {
              // handleChange(text, record);
              console.log("value", value);
              const preStatus = record.status;
              console.log(preStatus);
              var price;
              if (value === "SUCCESS") {
                price = parseFloat(record.price);
                console.log("hey");
                setTotal(total + price);
              }
              if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
                price = parseFloat(record.price);
                console.log("hi ");
                setTotal(total - price);
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
          {/* })() */}
        </>
      ),
    },
  ];

  return (
    <div>
      {console.log(data)}
      {console.log(total)}
      <DeliveryHeader />
      <div className="content">
        <p className="content-header">TO BE DELIVER</p>
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

// if (status === "UNSUCCESS")
//   return (
//     <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
//       UNSUCCESS
//     </span>
//   );

// if (status === "ON GOING")
//   return (
//     <span style={{ color: "#1890ff", fontWeight: "bold" }}>
//       ON GOING
//     </span>
//   );
// return (
//   <span style={{ color: "#52c41a", fontWeight: "bold" }}>
//     SUCCESS
//   </span>
// );

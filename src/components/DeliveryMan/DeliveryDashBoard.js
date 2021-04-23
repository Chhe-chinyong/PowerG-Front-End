import React, { useState, useEffect, useRef } from "react";
import { Form, Table, Select, Button, message, Input, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";
import DeliveryHeader from "../DeliveryMan/DeliveryHeader";
import axios from "axios";
import { getAllByDisplayValue } from "@testing-library/dom";
import { FileAddOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { Item } = Form;
function DeliveryDashBoard() {
  // state
  const [total, setTotal] = useState(0);
  const [listId, setListId] = useState();
  const [initialValue, setInitialValue] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dataListId, setDataListId] = useState("");
  // useRef
  const ListIdRef = useRef(null);
  const dateFormat = "YYYY/M/D";

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
    if(listId)
      fetchItem();
  }, []);

  // const generateList = async () => {
  //   const listId = localStorage.getItem("listId");
  //   // if (listId) {
  //   //   return console.log("u have already generate list");
  //   // }
  //   // const uuid_store = await uuidv4();
  //   // localStorage.setItem("listId", uuid_store.substring(0, 12));
  //   // // return console.log(uuid_store.substring(0, 8));
  // };
  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (visible) => {
    console.log(visible);
    setVisible(visible);
    console.log(visible);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  // Function to get ListId 
  const handleGetList = async() => {


    const tgai = await moment().format('YYYY/M/D');
    const name = localStorage.getItem('u_username');
    const id = localStorage.getItem('u_id');
    console.log(tgai)
    console.log(name)
    console.log(id)
    try {
      const result = await axios.get(`${process.env.REACT_APP_DOMAIN}/packageList/getListByDateId`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
            params: {
              date: tgai,
              id:id,
              name:name
             },
          }
      )
      console.log(result)
      // setListId(listId);
      // localStorage.setItem('listId', result);

      message.success({
        content: "" + "Created successfully",
        duration: 5,
        className: "UserSuccessMessage",
      });

    } catch (error) {
      message.error({
        content: "" + 'Can not get list',
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  }

  const handleClickList = () => {
      if (listId) {
        message.error({
          content: "" + 'u have already generate list',
          className: "UserErrorMessage",
          duration: 5,
        });
        return;
      }
      else {
        handleGetList();
      }
  }


  const handleTextChange = (e,record) => {
    console.log('record change',record);
    console.log(e.target.value);
    // update messaget to data
    record.others = e.target.value;
    console.log(record)
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
      if (!localStorage.getItem("listId")) {
        throw {
          response: {
            data: {
              message: "please scan product in order to create list",
            },
          },
        };
      }
      const data = initialValue
      // console.log('data',data)
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
      console.log("data1", data);
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
    // {
    //   title: "CONTACT",
    //   dataIndex: "cust_phone",
    //   key: "cust_phone",
    //   className: "columns",
    // },
    // {
    //   title: "PRICE",
    //   dataIndex: "pro_price",
    //   key: "pro_price",
    //   className: "columns",
    //   render: (record) => {
    //     return <span className="priceDelivery">${record}</span>;
    //   },
    // },
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

    {
      title: "Message",
      dataIndex: "others",
      key: "others",
      className: "columns",
      render: (text, record) => (<Input placeholder="write" onChange={(e)=> {
        handleTextChange(e, record);
      }}/>)
      
      
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
            // onClick={generateList}
            onClick={showModal}
          >
            ListID
          </Button>
        </div>

        {/* show modal */}
        <Modal
        title="List"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
          <Item >
            {/* <Input ref={ListIdRef} onChange={(e)=> {setDataListId(e.target.value)}}/> */}
            <Button style={{marginTop:"1.2rem", marginRight:"1rem" }} type="primary"
            size="default" onClick={handleClickList}>Submit</Button>
             <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Item>
      </Modal>
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
        {/* <p>
          TOTAL AMOUNT:{}
          <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
            ${total}{" "}
          </span>{" "}
        </p> */}
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

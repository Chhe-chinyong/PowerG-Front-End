import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Table,
  Select,
  Button,
  message,
  Input,
  Modal,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import axios from "axios";
import { GetColumnSearchProps } from "../../includes/external";
import { FileAddOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { Item } = Form;
function ListEdit({ listIdPass }) {
  console.log(listIdPass);
  // state
  const [total, setTotal] = useState(0);
  const [listId, setListId] = useState();
  const [initialValue, setInitialValue] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [dataListId, setDataListId] = useState("");
  const [payment, setPayment] = useState("");
  const [others, setOthers] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  // Editable State
  const [form] = Form.useForm();
  const [data, setData] = useState(initialValue);
  const [editingKey, setEditingKey] = useState("");

  // useRef
  const ListIdRef = useRef(null);
  const dateFormat = "YYYY/M/D";

  //UseEffect
  useEffect(() => {
    // const listId = localStorage.getItem("listId");
    // setListId(listId);
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/packageList/getListById/${listIdPass}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const allData = result.data.data;
      console.log(allData);
      // setInitialValue(allData);
      setData(allData);
      console.log(initialValue);
    };

    const fetchTotalAmount = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_DOMAIN}/packageList/getListAndGenerateTotal/${listIdPass}`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // setProductList(result);
        console.log("amount", result.data.total_amount);
        setAmount(result.data.total_amount);
      } catch (error) {
        console.log("error" + error);
      }
    };
    // if(listId)
    // console.log("fetchTotal", fetchTotalAmount);
    fetchItem();
    fetchTotalAmount();
  }, [listIdPass, trigger]);

  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (visible) => {
    setVisible(visible);
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
    setVisible(false);
  };

  // Function to get ListId
  const handleGetList = async () => {
    const tgai = await moment().format("YYYY/M/D");
    const name = localStorage.getItem("u_username");
    const id = localStorage.getItem("u_id");

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/packageList/getListByDateId`,
        {
          headers: { "auth-token": localStorage.getItem("token") },
          params: {
            date: tgai,
            id: id,
            name: name,
          },
        }
      );

      const lastIndex = result.data.data.length - 1;

      const ListIdBack = result.data.data[lastIndex].listId;
      setListId(ListIdBack);
      localStorage.setItem("listId", ListIdBack);

      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
    } catch (error) {
      message.error({
        content: "" + "Can not get list",
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };

  const handleClickList = () => {
    if (listId) {
      message.error({
        content: "" + "u have already generate list",
        className: "UserErrorMessage",
        duration: 5,
      });
      return;
    } else {
      handleGetList();
    }
  };

  const handleTextChange = (e, record) => {
    // update messaget to data
    record.others = e.target.value;
  };

  function checkStatus(values) {
    values.forEach((value) => {
      if (value.status === "ON GOING") {
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

  const handleChangePayment = (value) => {
    console.log(value);
    // setPayment(value);
  };

  const handleOthers = (e) => {
    console.log(e.target.value);
    // setOthers(e.target.value);
  };

  const handleStatus = (value) => {
    console.log(value);
    // setStatus(e.target.value);
  };

  // Editable

  const InputCheck = (inputType) => {
    if (inputType === "payment_method")
      return (
        <Select onChange={handleChangePayment}>
          <Option value="COD">COD</Option>
          <Option value="PAID">PAID</Option>
        </Select>
      );

    if (inputType === "service_paid_by")
      return (
        <Select>
          <Option value="transferer">Transferer</Option>
          <Option value="receiver">Receiver</Option>
        </Select>
      );

    if (inputType === "others") {
      console.log("others");
      return <Input onChange={handleOthers} value={others} />;
    }
    if (inputType === "status") {
      return (
        <Select onChange={handleStatus}>
          <Option value="SUCCESS">SUCCESS</Option>
          <Option value="UNSUCCESS">UNSUCCESS</Option>
        </Select>
      );
    } else return <Input />;
  };

  const isEditing = (record) => record.package_id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      payment_method: "",
      status: "",
      others: "",
      ...record,
    });
    setEditingKey(record.package_id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.package_id);

      if (index > -1) {
        const item = newData[index];
        const returnedTarget = Object.assign(item, row);
        console.log(row);
        console.log(returnedTarget);
        try {
          const result = await axios.put(
            `${process.env.REACT_APP_DOMAIN}/package/updatePackageById`,
            returnedTarget,
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

          console.log("newData", item);
          newData.splice(index, 1, { ...item, ...row });

          setData(newData);
          console.log(data);
          setEditingKey("");
          setTrigger(true);
        } catch (error) {
          console.log("back-end", error);
          const messageError = error.response.data.message;
          message.error({
            content: "" + messageError,
            className: "UserErrorMessage",
            duration: 5,
          });
        }

        // console.log("newData", item);
        // newData.splice(index, 1, { ...item, ...row });

        // setData(newData);
        // console.log(data);
        // setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // const inputNode = inputType === "Option" ? <Select /> : <Input />;
    // const a = (inputType) => {
    //   console.log(inputType);
    //   if (inputType === "Option") return <Select />;
    //   else return <Input />;
    // };
    // From external.js
    // console.log(inputType);
    const inputNode = InputCheck(inputType);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            // rules={[
            //   {
            //     required: true,
            //     message: `Please Input ${title}!`,
            //   },
            // ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      key: "package_id",
      title: "PRODUCT ID",
      dataIndex: "package_id",
      ...GetColumnSearchProps("package_id"),
      // className: "columns",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "payment_method",
      dataIndex: "payment_method",
      key: "payment_method",
      editable: true,
    },

    {
      title: "service_paid_by",
      dataIndex: "service_paid_by",
      key: "service_paid_by",
      editable: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      editable: true,
      // className: "columns",

      // Testing
      // render: (text, record) => {
      //   if (record.status === "ON GOING") {
      //     return (
      //       <>
      //         <Select
      //           style={{
      //             width: 100,
      //             color: "#bdc3c7",
      //             fontSize: "0.6rem",
      //           }}
      //           defaultValue="ON GOING"
      //           // ref={statusRef}
      //           onChange={(value) => {
      //             // handleChange(text, record);

      //             // Set key to state
      //             // setKeyIndex(record.key);
      //             const preStatus = record.status;

      //             var price;

      //             if (value === "SUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total + price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }
      //             if (value === "UNSUCCESS") {
      //               trigger ? setTrigger(false) : setTrigger(true);
      //               // trigger === true ? setTrigger(false) : setTrigger(true);
      //             }
      //             if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             if (preStatus === "SUCCESS" && value === "ON GOING") {
      //               price = parseFloat(record.price);
      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             // Change status to data
      //             record.status = value;
      //           }}
      //         >
      //           <Option
      //             value="ON GOING"
      //             style={{
      //               color: "#bdc3c7",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             ON GOING
      //           </Option>
      //           <Option
      //             value="SUCCESS"
      //             // className="SUCCESS"
      //             style={{
      //               color: "#52c41a",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             SUCCESS
      //           </Option>
      //           <Option
      //             value="UNSUCCESS"
      //             style={{
      //               color: "#ff4d4f",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             UNSUCCESS
      //           </Option>
      //         </Select>
      //       </>
      //     );
      //   } else if (record.status === "UNSUCCESS") {
      //     return (
      //       <>
      //         <Select
      //           style={{
      //             width: 100,
      //             color: "red",
      //             fontSize: "0.6rem",
      //           }}
      //           onChange={(value) => {
      //             // handleChange(text, record);

      //             // Set key to state
      //             // setKeyIndex(record.key);
      //             const preStatus = record.status;

      //             var price;

      //             if (value === "SUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total + price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             if (preStatus === "SUCCESS" && value === "ON GOING") {
      //               price = parseFloat(record.price);
      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             // Change status to data
      //             record.status = value;
      //           }}
      //         >
      //           <Option
      //             value="ON GOING"
      //             style={{
      //               color: "#bdc3c7",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             ON GOING
      //           </Option>
      //           <Option
      //             value="SUCCESS"
      //             // className="SUCCESS"
      //             style={{
      //               color: "#52c41a",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             SUCCESS
      //           </Option>
      //           <Option
      //             value="UNSUCCESS"
      //             style={{
      //               color: "#ff4d4f",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             UNSUCCESS
      //           </Option>
      //         </Select>
      //       </>
      //     );
      //   } else if (record.status === "SUCCESS") {
      //     return (
      //       <>
      //         <Select
      //           style={{
      //             width: 100,
      //             color: "#52c41a",
      //             fontSize: "0.6rem",
      //           }}
      //           // defaultValue="ON GOING"
      //           // ref={statusRef}
      //           onChange={(value) => {
      //             // handleChange(text, record);

      //             // Set key to state
      //             // setKeyIndex(record.key);
      //             const preStatus = record.status;

      //             var price;

      //             if (value === "SUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total + price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             if (preStatus === "SUCCESS" && value === "UNSUCCESS") {
      //               price = parseFloat(record.price);

      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             if (preStatus === "SUCCESS" && value === "ON GOING") {
      //               price = parseFloat(record.price);
      //               setTotal(total - price);
      //               trigger ? setTrigger(false) : setTrigger(true);
      //             }

      //             // Change status to data
      //             record.status = value;
      //           }}
      //         >
      //           <Option
      //             value="ON GOING"
      //             style={{
      //               color: "#bdc3c7",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             ON GOING
      //           </Option>
      //           <Option
      //             value="SUCCESS"
      //             // className="SUCCESS"
      //             style={{
      //               color: "#52c41a",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             SUCCESS
      //           </Option>
      //           <Option
      //             value="UNSUCCESS"
      //             style={{
      //               color: "#ff4d4f",
      //               fontWeight: "bold",
      //               fontSize: "0.6rem",
      //             }}
      //           >
      //             UNSUCCESS
      //           </Option>
      //         </Select>
      //       </>
      //     );
      //   }
      // },
    },

    {
      title: "Message",
      dataIndex: "others",
      key: "others",
      editable: true,
      // render: (text, record) => (
      //   <Input
      //     placeholder="write"
      //     onChange={(e) => {
      //       handleTextChange(e, record);
      //     }}
      //   />
      // ),
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.package_id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,

        // () => {
        //   return col.dataIndex === "payment_method" ? "Option" : "text";
        // },
        // col.dataIndex === "payment_method" || col.dataIndex === "status"
        //   ? "Option"
        //   : "text",
        // onChange: handleChange,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      {/* <DeliveryHeader /> */}
      <div className="content">
        <div className="contentHeaderWrap">
          <p className="content-header">LIST: {listIdPass}</p>

          <div className="total-container-report">
            <p>
              TOTAL AMOUNT:{}
              <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
                {" "}
                ${amount}{" "}
              </span>{" "}
            </p>
          </div>
        </div>

        {/* show modal */}
        {/* <Modal
        title="List"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
          <Item >
            <Button style={{marginTop:"1.2rem", marginRight:"1rem" }} type="primary"
            size="default" onClick={handleClickList}>Submit</Button>
             <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Item>
      </Modal> */}
        {/* <Table
          // columns={columns}
          // dataSource={initialValue}
          // scroll={{ x: "max-content", y: 600 }}
          // pagination={false}
          // style={{ padding: "0 1rem" }}
          // for editable 
        /> */}
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{ y: 600 }}
            pagination={false}
            // pagination={{
            //   onChange: cancel,
            // }}
          />
        </Form>
      </div>
      {/* Amount is dynamic value */}
      <div className="total-container">
        {/* <p>
          TOTAL AMOUNT:{}
          <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
            ${total}{" "}
          </span>{" "}
        </p> */}
        {/* <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Button
            type="primary"
            size="default"
            htmlType="submit"
            className="total-button"
          >
            Submit
          </Button>
          <Button>Cancel</Button>
        </Form> */}
      </div>
    </div>
  );
}

export default ListEdit;

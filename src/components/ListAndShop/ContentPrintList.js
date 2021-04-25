import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Space,  message } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import {GetColumnSearchProps} from "../../includes/external"
import Highlighter from "react-highlight-words";
import axios from "axios";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";


import { PDFList } from "./PDFList";
function ContentPrintList() {
  const data = [
    {
      listId: "11",
      deliveryManId: "1",
    },
  ];
  // useRef
  const searchRef = useRef(null);
  const refPrint = useRef();
  // State
  const [initialValue, setInitialValue] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [productList, setProductList] = useState({});
  // const [searchInput, setSearchInput] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [click, setClick] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/packageList/getAllLists`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const allData = result.data.data;

      setInitialValue(allData.reverse());
    };
    fetchItem();

  }, []);

  // Fetch data again we anything change
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/packageList/getAllLists`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const allData = result.data.data;

      setInitialValue(allData.reverse());
    };
    fetchItem();
  }, [trigger]);


  const showModal = () => {
    setVisible(true);
  };

  const showModal1 = () => {
    setVisible1(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancel1 = () => {
    setVisible1(false);
  };

  const handleDownload = (record) => {
    setProductList(record);
    // return <PDFList productList={productList} />;
    // handlePrint();
    // return <PDFList ref={refPrint} />;
  };
  // const handleDelete = (record) => {
  //   console.log("record", record);
  // };
  // const handlePrint = (record) => {
  //   setVisible1(true);
  //   console.log(record);
  //   // <PDFList data={record} />;
  // };

  // Delete user
  const confirm = async (record) => {
    const id = record.user_id;
  
    try {
      // Delete Data
      const result = await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/api/user/deleteuserbyid/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      
      setInitialValue(initialValue.filter((value) => value.user_id !== id));
      message.success({
        content: "" + result.data.message,
        duration: 5,
        className: "UserSuccessMessage",
      });
    } catch (error) {
      const messageError = error.response.data.message;
      message.error({
        content: "" + messageError,
        className: "UserErrorMessage",
        duration: 5,
      });
    }
  };

  const cancel = (e) => {
 
    message.error("Click on No");
  };

  // function refreshPage() {
  //   window.location.reload();
  // }
  // Data
  const columns = [
    {
      title: <strong>ListId</strong>,
      dataIndex: "listId",
      key: "id",
      className: "col-username",
      ...GetColumnSearchProps("listId"),
    },

    {
      title: <strong>DeliveryBy</strong>,
      dataIndex: "deliveryManName",
      key: "deliveryManName",
    },
    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (text, record) => {
        return (
          // const editable = isEditing(record);
          <Space size="middle">
            <Button
              className="noOutLine editUser"
              icon={<PrinterOutlined />}
              // onClick={() => handleEdit(text, record)}
              onClick={() => {
                // handleDownload(record);

                setProductList(record);

                setTimeout(() => {
                  setClick(true);
                  handlePrint();
                }, 2000);

                // handlePrint
              }}
              // onClick={handleDownload}
            ></Button>
          </Space>
        );
      },
    },
  ];

  //  Data
  return (
    <>
      {/* Table */}
      <Table
        className="listTable"
        columns={columns}
        dataSource={initialValue}
        // dataSource={data}
        scroll={{ x: "max-content", y: 500 }}
        pagination={false}
      />
      <PDFList
        ref={refPrint}
        productList={productList}
        // click={click}
        // setClick={setClick}
      />

      {/* {click ? (
        <PDFList ref={refPrint} productList={productList} className="PDFLIST" />
      ) : null} */}
    </>
  );
}

export default ContentPrintList;

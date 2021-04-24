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
      console.log(result);
      const allData = result.data.data;
      console.log(allData);

      setInitialValue(allData.reverse());
    };
    fetchItem();
    // console.log("first", initialValue);
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
    // console.log("first", initialValue);
  }, [trigger]);

  // searchBar
  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //   }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         inputId="select-input"
  //         ref={searchRef}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: "block" }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .includes(value.toLowerCase())
  //       : "",
  //   onFilterDropdownVisibleChange: (visible) => {
  //     console.log("search", searchRef);
  //     if (visible) {
  //       // setTimeout(() => searchRef.current.select.inputRef.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   SetSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

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
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleCancel1 = () => {
    console.log("Clicked cancel button");
    setVisible1(false);
  };

  const handleDownload = (record) => {
    console.log(record);
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
    console.log(id);
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
      console.log(initialValue);
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
    console.log(e);
    message.error("Click on No");
  };

  // function refreshPage() {
  //   window.location.reload();
  // }
  // Data
  const columns = [
    // {
    //   //title is display on coulmn
    //   //dataIndex to match with datasouce to display
    //   title: <strong>ID</strong>,
    //   dataIndex: "id",
    //   key: "id",
    //   defaultSortOrder: "ascend",

    //   ...getColumnSearchProps("user_id"),
    //   sorter: (a, b) => a.user_id - b.user_id,
    // },
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

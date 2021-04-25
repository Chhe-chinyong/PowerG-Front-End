import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Space, Modal, Input, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import {
  UserAddOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

// Component;
import ContentShopAdd from "./ContentShopAdd";
import ContentUserEdit from "../ContentUserEdit";

function ContentShop() {
  // useRef
  const searchRef = useRef(null);

  

  // State
  const [initialValue, setInitialValue] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [searchInput, setSearchInput] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/shop/getAllShops`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
    
      const allData = result.data.data;

      setInitialValue(allData);
    };
    fetchItem();
   
  }, [trigger]);

  // Fetch data again we anything change
  // useEffect(() => {
  //   const fetchItem = async () => {
  //     const result = await axios(
  //       `${process.env.REACT_APP_DOMAIN}/shop/getAllShops`,
  //       {
  //         headers: {
  //           "auth-token": localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     const allData = result.data.data;
  //     setInitialValue(allData);
  //   };
  //   fetchItem();

  // }, [trigger]);

  // searchBar
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          inputId="select-input"
          ref={searchRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
    
      if (visible) {
        // setTimeout(() => searchRef.current.select.inputRef.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    SetSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

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

  // Delete user
  const confirm = async (record) => {
    const id = record.id;
    try {
      // Delete Data
      const result = await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/shop/deleteShop/${id}`,
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
    // {
    //   //title is display on coulmn
    //   //dataIndex to match with datasouce to display
    //   title: <strong>ID</strong>,
    //   dataIndex: "user_id",
    //   key: "id",
    //   // defaultSortOrder: "ascend",

    //   ...getColumnSearchProps("user_id"),
    //   sorter: (a, b) => a.user_id - b.user_id,
    // },
    {
      title: <strong>shopName</strong>,
      dataIndex: "shopName",
      key: "shopName",
      className: "col-username",
      ...getColumnSearchProps("shopName"),
    },
    // {
    //   title: <strong>PASSWORD</strong>,
    //   dataIndex: "user_password",
    //   key: "user_password",
    // },
    {
      title: <strong>shopContact</strong>,
      dataIndex: "shopContact",
      key: "shopContact",
    },

    {
      title: <strong>shopAddress</strong>,
      dataIndex: "shopAddress",
      key: "shopAddress",
    },
    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (text, record) => {
        return (
          // const editable = isEditing(record);
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                confirm(record);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="noOutLine removeUser"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>

            {/* <Button
              className="noOutLine editUser"
              icon={<EditOutlined />}
              // onClick={() => handleEdit(text, record)}
              onClick={() => {
                handleEdit(record);
              }}
            ></Button> */}
          </Space>
        );
      },
    },
  ];

  //  Data
  return (
    <>
      {/* Refresh Button */}
      {/* <Button
        className="userRefreshPage"
        icon={<SyncOutlined />}
        onClick={refreshPage}
        type="primary"
      >
        Refresh
      </Button> */}
      <div className="flex-shop">
        <h4>Shop</h4>
        <Button
          className="userAdd "
          icon={<UserAddOutlined />}
          onClick={showModal}
        >
          ADD
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={initialValue}
        scroll={{ x: "max-content", y: 500 }}
        pagination={false}
        className="listShop"
      />

      {/* ADD*/}
      <Modal
        title="Add New Shop"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <ContentShopAdd
          setVisible={setVisible}
          initialValue={initialValue}
          setInitialValue={setInitialValue}
          setTrigger={setTrigger}
        />
      </Modal>

      {/* Edit */}
      <Modal
        title="Edit User"
        visible={visible1}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel1}
      >
        <ContentUserEdit
          setVisible={setVisible1}
          user={user}
          visible1={visible1}
          setTrigger={setTrigger}
        />
      </Modal>
    </>
  );
}

export default ContentShop;

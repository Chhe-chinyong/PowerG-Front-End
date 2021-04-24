import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Space, Modal, Input, Popconfirm, message } from "antd";
import {GetColumnSearchProps} from "../includes/external"
import axios from "axios";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

// Component;
import ContentUserAdd from "../components/ContentUserAdd";
import ContentUserEdit from "../components/ContentUserEdit";

function ContentUser() {
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
      const result = await axios(`${process.env.REACT_APP_DOMAIN}/api/user/getallusers`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(result);
      const allData = result.data.data;
      const datas = allData.map((data) => {
        const contact = data.contact.split("");
        contact.splice(3, 0, "  ");
        contact.splice(7, 0, "  ");
        const contact_result = contact.join("");
        console.log(contact_result);
        const object = Object.assign({}, data, { contact: contact_result });
        return object;
      });
      setInitialValue(datas);
    };
    fetchItem();
    // console.log("first", initialValue);
  }, []);

  // Fetch data again we anything change
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/api/user/getallusers`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const allData = result.data.data;
      const datas = allData.map((data) => {
        const contact = data.contact.split("");
        contact.splice(3, 0, "  ");
        contact.splice(7, 0, "  ");
        const contact_result = contact.join("");
        console.log(contact_result);
        const object = Object.assign({}, data, { contact: contact_result });
        return object;
      });
      setInitialValue(datas);
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

  const handleEdit = (record) => {
    setVisible1(true);
    setUser(record);

    console.log(record);
  };

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
    {
      //title is display on coulmn
      //dataIndex to match with datasouce to display
      title: <strong>ID</strong>,
      dataIndex: "user_id",
      key: "id",
      // defaultSortOrder: "ascend",

      ...GetColumnSearchProps("user_id"),
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: <strong>USERNAME</strong>,
      dataIndex: "user_name",
      key: "user_name",
      className: "col-username",
      ...GetColumnSearchProps("user_name"),
    },
    // {
    //   title: <strong>PASSWORD</strong>,
    //   dataIndex: "user_password",
    //   key: "user_password",
    // },
    {
      title: <strong>CONTACT</strong>,
      dataIndex: "contact",
      key: "user_contact",
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

            <Button
              className="noOutLine editUser"
              icon={<EditOutlined />}
              // onClick={() => handleEdit(text, record)}
              onClick={() => {
                handleEdit(record);
              }}
            ></Button>
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
      <Button
        className="userAdd "
        icon={<UserAddOutlined />}
        onClick={showModal}
      >
        ADD
      </Button>
      {/* Table */}
      <Table columns={columns} dataSource={initialValue} />

      {/* ADD*/}
      <Modal
        title="Add New User"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <ContentUserAdd
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

export default ContentUser;

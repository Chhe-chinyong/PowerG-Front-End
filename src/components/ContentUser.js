import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Space, Modal, Input } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

// Component;
import ContentUserAdd from "./ContentUserAdd";
import ContentUserEdit from "./ContentUserEdit";
function ContentUser() {
  // useRef
  const searchRef = useRef(null);

  // State
  const [initialValue, setInitialValue] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  const [user, setUser] = useState("");
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [modalText, setModalText] = useState("Content of the modal");

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(`http://165.22.252.116/api/user/getallusers`);
      const allData = result.data.data;
      setInitialValue(allData);
    };
    fetchItem();
    console.log(initialValue);
  }, []);

  // Testing
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
      console.log("search", searchRef);
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
    // this.setState({ searchText: "" });
  };

  //   Event-handler
  const handleClick = (e) => {
    console.log("Clicked me");
    setClick((prevClicked) => (prevClicked ? false : true));
    console.log(click);
    // <ContentUserAdd />;
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
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleCancel1 = () => {
    console.log("Clicked cancel button");
    setVisible1(false);
  };

  const handleSelect = () => {
    console.log("handleSelect");
  };

  const handleDelete = () => {};
  const handleEdit = (text, record) => {
    setVisible1(true);
    setUser(text);
    console.log(record.key);
    console.log(text);
  };

  // Data
  const columns = [
    {
      //title is display on coulmn
      //dataIndex to match with datasouce to display
      title: <strong>ID</strong>,
      dataIndex: "user_id",
      key: "id",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("user_id"),
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: <strong>USERNAME</strong>,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: <strong>PASSWORD</strong>,
      dataIndex: "user_password",
      key: "user_password",
    },
    {
      title: <strong>CONTACT</strong>,
      dataIndex: "user_contact",
      key: "user_contact",
    },
    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (text, record) => {
        return (
          // const editable = isEditing(record);
          <Space size="middle">
            <Button
              className="noOutLine removeUser"
              icon={<DeleteOutlined />}
            ></Button>
            <Button
              className="noOutLine editUser"
              icon={<EditOutlined />}
              // onClick={() => handleEdit(text, record)}
              onClick={() => {
                handleEdit(text, record);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      user_id: "000001",
      user_name: "Kok dara",
      user_password: "901294012940214",
      user_contact: "0129928475",
    },
    {
      key: "2",
      Id: "000002",
      Username: "Mingthean Lay",
      Password: "901294012940214",
      Contact: "0298844888",
    },
    {
      key: "3",
      Id: "000003",
      Username: "Phal sokheng",
      Password: "901294012940214",
      Contact: "010928475",
    },
  ];
  return (
    <>
      <Input.Search
        className="userSearch"
        placeholder="input search text"
        onSearch={handleSearch}
        loading={false}
        ref={searchRef}
      />
      <Button
        className="userAdd "
        icon={<UserAddOutlined />}
        onClick={showModal}
      >
        ADD
      </Button>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={initialValue}
        rowSelection={handleSelect}
      />

      {/* ADD*/}
      <Modal
        title="Add New User"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <ContentUserAdd setVisible={setVisible} />
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
        />
      </Modal>
    </>
  );
}

export default ContentUser;

{
  /* Condition */
}
{
  /* {click ? <ContentUserAdd /> : <></>} */
}

import React, { useState } from "react";
import "antd/dist/antd.css";
import Highlighter from "react-highlight-words";
import { Button, Space, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const GetColumnSearchProps = (dataIndex) => {
  //State
  // const [Trigger, setTrigger] = useState(false);
  // const [initialValue, setInitialValue] = useState([]);
  // const [visible, setVisible] = useState(false);
  // const [visible1, setVisible1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  //State for Product
  // const [packageId, setPackageId] = useState();
  // const [date, setDate] = useState();
  // const [location, setLocation] = useState();
  // const [shopPhone, setShopPhone] = useState();
  // const [receiverPhone, setReceiverPhone] = useState();
  // const [track,setTrack] = useState(false);

  // ListEdit.js : state

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    SetSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          inputId="select-input"
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
  };
};

// ListEdit.js
// const handleChangePayment = (value) => {
//   console.log(value);
//   setPayment(value);
// };

// const handleOthers = (e) => {
//   console.log(e.target.value);
// };
// const inputType = (inputType) => {
//   if (inputType === "payment_method")
//     return <Select onChange={handleChangePayment} />;

//   if (inputType === "others") return <Input onChange={handleOthers} />;
//   else return <Input />;
// };

export { GetColumnSearchProps };

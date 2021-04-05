import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import Highlighter from "react-highlight-words";
import {
  DatePicker,
  Table,
  Button,
  Space,
  Modal,
  Input,
  Popconfirm,
  message,
  Tooltip,
  Select,
} from "antd";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  SyncOutlined,
  ShopOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import moment from "moment";

// Component

import { ProductContext } from "../../context/AuthContext";

const { Option } = Select;

function ReportShop() {
  const data = [
    {
      key: "1",
      product_id: "000001",
      shop_owner: "Kok dara",
      service_paid_by: "COD",
      cust_location: "AEON2",
      cust_name: "Yong",
      status: "SUCCESS",
      date: "30-july-2021",
      DeliveryID: "0001",
    },
    {
      key: "2",
      product_id: "000002",
      shop_owner: "totot",
      service_paid_by: "COD",
      cust_location: "borey penghout near AEON2",
      cust_name: "Yong",
      status: "ON GOING",
      date: "30-july-2021",
      DeliveryID: "0001",
    },
    {
      key: "3",
      product_id: "000003",
      shop_owner: "yong yong",
      service_paid_by: "COD",
      cust_location: "borey penghout ",
      cust_name: "Yong",
      status: "ON GOING",
      date: "30-july-2021",
      DeliveryID: "0008",
    },
    {
      key: "4",
      product_id: "000003",
      shop_owner: "yong yong",
      service_paid_by: "COD",
      cust_location: "borey penghout ",
      cust_name: "Yong",
      status: "UNSUCCESS",
      date: "30-july-2021",
      DeliveryID: "0008",
    },
  ];
  // const object = Object.assign({}, datas, () => {
  //   datas.map((data) => {
  //     if (data.status === "SUCCESS") {
  //       data.status;
  //     }
  //   });
  // });
  // const result = datas.map((data) => {
  //   return data.status;
  // });

  const dateFormat = "YYYY/MM/DD";
  //State
  const [Trigger, setTrigger] = useState(false);
  const [initialValue, setInitialValue] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  //State for Product
  const [packageId, setPackageId] = useState();
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [shopPhone, setShopPhone] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [options, setOptions] = useState([]);

  //UseEffect
  //Display all packages
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/getAllShops`,
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      const allData = result.data.data;
      console.log(allData);
      // const datas = allData.map((data) => {
      //   const contact = data.contact.split("");
      //   contact.splice(3, 0, "  ");
      //   contact.splice(7, 0, "  ");
      //   const contact_result = contact.join("");
      //   console.log(contact_result);
      //   const object = Object.assign({}, data, { contact: contact_result });
      //   return object;
      // });
      setOptions(allData);
    };
    fetchItem();
    console.log("first", initialValue);
  }, []);

  // Event
  // get data after change date
  function onChange(date, dateString) {
    console.log("date", date);
    console.log("dateString", dateString);
  }

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleEdit = (record) => {
    setVisible1(true);
    // setUser(record);
    console.log(record);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    SetSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleDownload = () => {
    console.log("Download");
  };

  // Delete user

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

  // showModal
  const showModal = () => {
    setVisible(true);
  };

  // Data
  const columns = [
    {
      //title is display on coulmn
      //dataIndex to match with datasouce to display
      title: <strong>ID</strong>,
      dataIndex: "product_id",
      key: "id",
      // defaultSortOrder: "ascend",

      ...getColumnSearchProps("product_id"),
      sorter: (a, b) => a.product_id - b.product_id,
    },
    {
      title: <strong>SHOP's Name</strong>,
      dataIndex: "shop_owner",
      key: "shop_owner",
    },

    {
      title: <strong>COD</strong>,
      dataIndex: "service_paid_by",
      key: "service_paid_by",
    },

    {
      title: <strong>Receiver</strong>,
      dataIndex: "cust_name",
      key: "cust_name",
    },
    {
      title: <strong>STATUS</strong>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {(() => {
            if (status === "UNSUCCESS")
              return <span style={{ color: "#ff4d4f" }}>UNSUCCESS</span>;
            if (status === "ON GOING")
              return <span style={{ color: "#1890ff" }}>ON GOING</span>;
            return <span style={{ color: "#52c41a" }}>SUCCESS</span>;
          })()}
        </>
      ),
    },
    {
      title: <strong>Date</strong>,
      dataIndex: "date",
      key: "date",
    },

    {
      title: <strong>Delivery By</strong>,
      dataIndex: "DeliveryID",
      key: "DeliveryID",
    },
  ];
  return (
    <ProductContext.Provider
      value={{
        packageId,
        date,
        location,
        shopPhone,
        receiverPhone,
        setPackageId,
        setDate,
        setLocation,
        setShopPhone,
        setReceiverPhone,
      }}
    >
      {/* Header */}
      <div>
        <div className="total-container-report">
          <p>
            TOTAL AMOUNT:{}
            <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
              {" "}
              $100{" "}
            </span>{" "}
          </p>
          {/* <Button type="primary" size="default" className="total-button">
          Submit
        </Button>
        <Button>Cancel</Button> */}
        </div>
        <div className="header-reportShop">
          <DatePicker
            defaultValue={moment()}
            format={dateFormat}
            onChange={onChange}
            //   className="date"
          />
          {/* shop */}
          <Select
            icon={<ShopOutlined />}
            defaultValue="Shop"
            style={{ width: 120 }}
            onChange={handleChange}
            size="default"
          >
            {options.map((option) => (
              <Option key={option.id} value={option.value}>
                {option.shopName}
              </Option>
            ))}

            {/* <Option value="jack">ZANDO</Option>
            <Option value="lucy">MANZER</Option>
            <Option value="lucy">PEDRO</Option> */}
          </Select>
          {/* Status */}
          <Select
            icon={<ShopOutlined />}
            defaultValue="Status"
            style={{ width: 120 }}
            onChange={handleChange}
            size="default"
          >
            <Option value="SUCCESS" style={{ color: "#52c41a" }}>
              SUCCESS
            </Option>
            <Option value="UNSUCCESS" style={{ color: "#ff4d4f" }}>
              UNSUCCESS
            </Option>
          </Select>

          {/* Download */}
          <Button
            type="primary"
            size="default"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          ></Button>
        </div>
        {/* Table */}
        <Table
          columns={columns}
          dataSource={data} /*dataSource={initialValue}*/
        />

        {/* Amount is dynamic value */}
        {/* Amount is dynamic value */}
        {/* <div className="total-container-report">
          <p>
            TOTAL AMOUNT:{}
            <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}>
              100{" "}
            </span>{" "}
          </p>
          
        </div> */}
      </div>
    </ProductContext.Provider>
  );
}

export default ReportShop;

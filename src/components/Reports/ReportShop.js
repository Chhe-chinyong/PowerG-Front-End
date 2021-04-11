import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import Highlighter from "react-highlight-words";
import { v4 as uuid_v4 } from "uuid";
import ReactToPrint, { useReactToPrint } from "react-to-print";
// import  {PDFShop} from './PDFShop';

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

  const dateFormat = 'YYYY/M/D';
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
  const [status, setStatus] =useState({});
  const [shop, setShop] = useState();
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [shopPhone, setShopPhone] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [options, setOptions] = useState([]);

  //UseEffect
  //Display shop
  useEffect(() => {
    const fetchItem = async () => {
      const tgai = await moment().format('YYYY/M/D');
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/getShopByDate`,
        {
          headers: { "auth-token": localStorage.getItem("token"),
          "query_date": tgai,
        },
        }
      );
      setDate(tgai);
      const allData = result.data.data;
      console.log('reportShop',allData);
      if (allData === undefined)
          return;
      
      setOptions(allData);
    };
    fetchItem();
    console.log("first", initialValue);
  }, []);


  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/packageOfShopByDate`,
        {
          headers: { "auth-token": localStorage.getItem("token"),
          "query_date": date,
          "shop": shop
        },
        }
      );
      const allData = result.data.data;
      console.log('reportShop',allData);
      setInitialValue(allData)

      const daily = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/dailyShopReport`,
        {
          headers: { "auth-token": localStorage.getItem("token"),
          "query_date": date,
          "shop": shop
        },
        }
      );

        setStatus(daily.data);
        console.log('status',status)

    };
    fetchItem();
    console.log("first", initialValue);
  }, [shop]);
  // Event
  // get data after change date
  function onChange(date, dateString) {
    console.log("date", date);
    console.log("dateString", dateString);
    setDate(dateString)
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
      setShop(value);
  
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
      dataIndex: "package_id",
      key: "id",
      // defaultSortOrder: "ascend",

      ...getColumnSearchProps("product_id"),
      sorter: (a, b) => a.package_id - b.package_id,
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
            if (status === "SUCCESS")
              return <span style={{ color: "#52c41a" }}>SUCCESS</span>;
            return <span style={{ color: "#bdc3c7" }}>PENDING</span>;
           
          })()}
        </>
      ),
    },
    {
      title: <strong>Date</strong>,
      dataIndex: "delivered_at",
      key: "date",
    },

    {
      title: <strong>Delivery By</strong>,
      dataIndex: "delivery_man_name",
      key: "delivery_man_name",
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
              ${status.total_amount}{" "}
            </span>{" "}
          </p>
          {/* <Button type="primary" size="default" className="total-button">
          Submit
        </Button>
        <Button>Cancel</Button> */}
        </div>
        <div className="header-reportShop">
          <DatePicker
            // defaultValue={moment(dateFormat)}
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
              <Option key={option.shop_owner} value={option.value}>
                {option.shop_owner}
              </Option>
            ))} 

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
           dataSource={initialValue}
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

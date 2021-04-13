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
} from "@ant-design/icons";
import moment from "moment";

// Component
import ContentProductAdd from "../Products/ContentProductAdd";
import Chart from "../../components/DashBoard/Chart";
import { ProductContext } from "../../context/AuthContext";
import { empty } from "uuidv4";

const { Option } = Select;

function ContentProduct() {
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

  //UseEffect
  //Display all packages
  useEffect(() => {
    const fetchItem = async () => {
      const tgai = await moment().format('YYYY/M/D');

      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/package/countPackageByDate`,
        { 
          params: {
          date: tgai
         },
          headers: { "auth-token": localStorage.getItem("token"),
         
         },
        }
      );
      console.log(result)
    
      const allData = result.data.data;
      setInitialValue(allData);
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

  // Delete user
  const confirm = async (record) => {
    const id = record.product_id;
    console.log(id);
    try {
      // Delete Data
      const result = await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/api/user/deleteuserbyid/${id}`
      );
      console.log(initialValue);
      setInitialValue(initialValue.filter((value) => value.user_id != id));
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

      ...getColumnSearchProps("package_id"),
      sorter: (a, b) => a.package_id - b.package_id,
    },
    {
      title: <strong>SHOP's Name</strong>,
      dataIndex: "shop_owner",
      key: "shop_owner",
    },

    {
      title: <strong>COD</strong>,
      dataIndex: "payment_method",
      key: "payment_method",
    },

    {
      title: <strong>service_paid</strong>,
      dataIndex: "service_paid_by",
      key: "service_paid_by",
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
    // {
    //   title: <strong>Date</strong>,
    //   dataIndex: "date",
    //   key: "date",
    // },

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
      <div>
        <Chart />

        {/* Table */}
        <Table
          columns={columns}
          dataSource={initialValue}
        />
      </div>
    </ProductContext.Provider>
  );
}

export default ContentProduct;

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
import { ProductContext } from "../../context/AuthContext";
function ContentProduct() {

  const dateFormat = "YYYY/M/D";
  //State
  const [Trigger, setTrigger] = useState(false);
  const [initialValue, setInitialValue] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, SetSearchedColumn] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [redirect, setRedirect] = useState(false);
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
      console.log(tgai)
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/package/countPackageByDate`,
        {
          headers: { "auth-token": localStorage.getItem("token"),
          "query_date": tgai,
         },
        }
      );
     
      console.log('data',result.data);
      const datas = result.data.data;
      setInitialValue(datas);
    };
    fetchItem();
    console.log("first", initialValue);
  }, [Trigger]);

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `${process.env.REACT_APP_DOMAIN}/package/countPackageByDate`,
        {
          headers: { "auth-token": localStorage.getItem("token"),
          "query_date": date,
         },
        }
      );
      console.log("result" + result.data.data);
      const datas = result.data.data;
      setInitialValue(datas);
    };
    fetchItem();
    console.log("first", initialValue);
  }, [date]);

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

  // Delete user
  const confirm = async (record) => {
    const id = record.package_id;
    console.log(id);
    try {
      // Delete Data
      const result = await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/package/deletePackageById/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(initialValue);
      setInitialValue(initialValue.filter((value) => value.user_id != id));
      setTrigger();
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
    setRedirect(false);
  };

  // Data
  const columns = [
    {
      //title is display on coulmn
      //dataIndex to match with datasouce to display
      title: <strong>ID</strong>,
      dataIndex: "package_id",
      key: "package_id",
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
      dataIndex: "service_paid_by",
      key: "service_paid_by",
    },

    {
      title: <strong>Receiver</strong>,
      dataIndex: "cust_name",
      key: "cust_name",
    },
    {
      title: <strong>Price</strong>,
      dataIndex: "pro_price",
      key: "pro_price",
    },

    {
      title: <strong> Contact</strong>,
      dataIndex: "cust_phone",
      key: "cust_phone",
    },
    {
      title: <strong>Location</strong>,
      dataIndex: "cust_location",
      key: "cust_location",
      className: "pro-location",
    },
    // {
    //   title: <strong>Delivery By</strong>,
    //   dataIndex: "DeliveryID",
    //   key: "DeliveryID",
    // },

    {
      title: <strong>Date</strong>,
      dataIndex: "created_at",
      key: "date",
    },

    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (text, record) => {
        return (
          // const editable = isEditing(record);
          <Space size="middle">
            <Popconfirm
              title="Are you sure to delete this package?"
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
        {/* ADD*/}

        <Button
          className="userAdd "
          icon={<UserAddOutlined />}
          onClick={showModal}
        >
          ADD
        </Button>
        <Modal
          title="Add New Product"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          footer={null}
          onCancel={handleCancel}
          width={800}
        >
          <ContentProductAdd
            setVisible={setVisible}
            initialValue={initialValue}
            setInitialValue={setInitialValue}
            setTrigger={setTrigger}
            redirect={redirect}
            setRedirect={setRedirect}
          />
        </Modal>

        <DatePicker
          defaultValue={moment()}
          format={dateFormat}
          onChange={onChange}
          className="date"
        />
        {/* Table */}
        <Table
          columns={columns}
          /* dataSource={data} */ dataSource={initialValue}
        />
      </div>
    </ProductContext.Provider>
  );
}

export default ContentProduct;

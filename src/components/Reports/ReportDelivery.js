import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {GetColumnSearchProps} from "../../includes/external"

import {
  DatePicker,
  Table,
  Input,
  message,
  AutoComplete,
  Select,
  Form
} from "antd";


// Component
import ContentProductAdd from "../Products/ContentProductAdd";
import Chart from "../DashBoard/Chart";
import { ProductContext } from "../../context/AuthContext";
const { Item } = Form;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 80,
  },
  wrapperCol: {
    span: 80,
  },
};

const { RangePicker } = DatePicker;

function ReportDelivery() {
  

  const dateFormat = "YYYY/M/D";
  //State
  const [Trigger, setTrigger] = useState(false);
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
  const [value, setValue] = useState([]);
  // State for data to load

  // const [startDate,setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [dateString, setDateString] = useState({startDate:"",
                                                endDate: ""});
  const [deliveryName, setDeliveryName] = useState("");
  const [data, setData] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [initialStatus, setInitialStatus] = useState([]);
  

  //UseEffect
  // Display shop
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(`${process.env.REACT_APP_DOMAIN}/api/user/getallusers`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const allData = result.data.data;
      setData(allData);
    };
    fetchItem();

  }, []);



  //Display all packages
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(`${process.env.REACT_APP_DOMAIN}/delivery/commission`, 
      {
        params: {start:dateString.startDate, end:dateString.endDate, name:deliveryName, },
        headers: { "auth-token": localStorage.getItem("token")}
       })
      
      
      setInitialValue(result.data.data);
      setInitialStatus(result.data)
   
    };
   
    if(deliveryName !== "" && dateString.startDate !== ""&& dateString.endDate !== "")
      fetchItem();
   
      
  }, [deliveryName, dateString.startDate, dateString.endDate]);

  // Event
  // get data after change date
  const onSearch = (searchText) => {
  
    setOptions(
      !searchText
        ? []
        : () => {
            const regex = new RegExp(`^${value}`, "i");
            const store = data.sort().filter((v) => regex.test(v.user_name));

            // setValue(store);
            const send = store.map((data) => {
              return {
                value: data.user_name,
                key:data.user_id
              };
            });
        
            return send;
          }
    );
  };

  const onSelect = (data) => {

    setDeliveryName(data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const handleDate = (date, dateString) => {
      setDateString({
          startDate:dateString[0],
          endDate: dateString[1]
      })
  
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const handleEdit = (record) => {
    setVisible1(true);
    
  
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
   
    setVisible(false);
  };

  // Delete user
  const confirm = async (record) => {
    const id = record.product_id;
 
    try {
      // Delete Data
      const result = await axios.delete(
        `http://165.22.252.116/api/user/deleteuserbyid/${id}`
      );
    
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

      ...GetColumnSearchProps("product_id"),
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
      dataIndex: "created_at",
      key: "created_at",
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
     
      <div>
        <div className="header-delivery-report"> 
     
              <AutoComplete
               style={{width:"50vh"}}
                      
                      options={options}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      onChange={onChange}
                     
                >
                  <Input.Search size="large"  placeholder="Input name" enterButton />

                </AutoComplete>
            {/* </Item> */}
          <RangePicker onChange={handleDate} size={"large"} format={dateFormat}/>
        </div>
     
        {/* status and total_amount */}
        {initialStatus && (
        <div className="container-box">
        <div className="box1">
          <p>DELIVERED TOTAL</p>
          <h3>{initialStatus.report  ?initialStatus.report.total : null}</h3>
                  
        </div>
    
        <div className="box2">
          <p>SUCCESS</p>
          <h3>{initialStatus.report?initialStatus.report.total_success:null}</h3>
        </div>
        <div className="box4">
          <p>UNSUCCESS</p>
          <h3>{initialStatus.report?initialStatus.report.total_unsuccess:null}</h3>
        </div>
        <div className="box3">
          <p>TOTAL</p>
          {initialStatus? <h3>$ {initialStatus.totalAmount}</h3>:null}
        </div>
        
      </div>)
}

        {/* Table */}
        <Table
          columns={columns}
          dataSource={initialValue}
        />
      </div>
    </ProductContext.Provider>
  );
}

export default ReportDelivery;

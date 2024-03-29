import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import salary from "../../images/salary.png";
import store from "../../images/store.png";
import dollar from "../../images/dollar.png";
import fee from "../../images/fee.png";
import schedule from "../../images/schedule.png";
import { GetColumnSearchProps } from "../../includes/external";

import { DatePicker, Table, Button, message, Select } from "antd";
import { ShopOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";

// Component

import { ProductContext } from "../../context/AuthContext";

const { Option } = Select;

function ViewDailyShop() {
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
  const [productList, setProductList] = useState({});

  //State for Product
  const [packageId, setPackageId] = useState();
  const [status, setStatus] = useState({});
  const [shop, setShop] = useState();
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [shopPhone, setShopPhone] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [options, setOptions] = useState([]);
  const [plus, setPlus] = useState("");
  const [minus, setMinus] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [count, setCount] = useState(0);
  const [countStore, setCountStore] = useState(0);
  //Ref
  const clearRef = useRef("");
  const refPrint = useRef();

  //UseEffect
  //get data from 2 endpoints
  useEffect(() => {
    const fetchItem = async () => {
      const tgai = await moment().format("YYYY/M/D");
      //get data all stores and total

      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/total/totalEachShop`,
        {
          params: {
            date: tgai,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );

      //get total fee

      const result_fee = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/total/totalServiceFee`,
        {
          params: {
            date: tgai,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );

      setDate(tgai);
      const allData = result.data.data.all;
      //loop to print ID N.O
      var i = 1;
      allData.map((ele) => {
        ele.id = i++;
      });
      //
      console.log(result_fee);
      console.log(result);
      if (allData === undefined) return;
      setCountStore(allData.length);
      setPlus(result.data.data.plusShop.total);
      setMinus(result.data.data.minusShop.total);
      setServiceFee(result_fee.data.totalServiceFee);
      setInitialValue(allData);
    };
    fetchItem();
  }, []);
  //
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/total/totalEachShop`,
        {
          params: {
            date: date,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      const allData = result.data.data.all;
      console.log("all", result);
      if (allData === undefined) {
        // clearRef.current.innerText = status.total_amount;
        setOptions([]);
        setInitialValue([]);
        return;
      }
      //get total fee

      const result_fee = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/total/totalServiceFee`,
        {
          params: {
            date: date,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      //loop to print ID N.O
      var i = 1;

      allData.map((ele) => {
        ele.id = i++;
      });
      //

      console.log(result_fee);
      console.log(result);
      setCountStore(allData.length);
      setPlus(result.data.data.plusShop.total);
      setMinus(result.data.data.minusShop.total);
      setServiceFee(result_fee.data.totalServiceFee);
      setInitialValue(allData);

      // setOptions(allData);
      // setProductList(initialValue);
      // setDate(date);
      // setShop(shop);
    };

    // Run fetch data
    if (count !== 0) fetchItem();

    return () => {
      setShop(null);
    };
  }, [date]);

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/total/totalEachShop`,
        {
          params: {
            date: date,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );
      const allData = result.data.data;
      console.log("clg", allData);
      setInitialValue(allData);
      setProductList(allData);
      const daily = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/shop/dailyShopReport`,
        {
          params: {
            date: date,
            shop: shop,
          },
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );

      setStatus(daily.data);
    };

    if (shop) {
      fetchItem();
    }
  }, [shop]);
  // Event

  //print report PDF
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });
  // get data after change date
  function onChange(date, dateString) {
    setDate(dateString);
    setCount(1);
  }

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

  function handleChange(value) {
    setShop(value);
  }

  const handleStatus = (value) => {
    const statusChange = initialValue.filter((data) => {
      return data.status === value;
    });
    setInitialValue(statusChange);
  };

  // showModal
  const showModal = () => {
    setVisible(true);
  };

  // Data
  const columns = [
    {
      title: <strong>N.O</strong>,
      dataIndex: "id",
      key: "id",
    },

    {
      title: <strong>SHOP's Name</strong>,
      dataIndex: "shop_owner",
      key: "shop_owner",
      className: "viewDailyShop-column",
    },

    {
      title: <strong>Total</strong>,
      dataIndex: "total",
      key: "total",
      ...GetColumnSearchProps("product_id"),
      sorter: (a, b) => a.total - b.total,
      render: (text) => {
        return <span style={{ fontWeight: "bold" }}>${text}</span>;
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
      {/* Header */}
      <div>
        <div className="dailyShop-container">
          {/* <DatePicker
            defaultValue={moment()}
            format={dateFormat}
            onChange={onChange}
          /> */}
          <div class="shop-box">
            <span className="image">
              <img src={store} alt="shop" style={{ width: "30px" }} />
            </span>
            <div className="shop-box-container">
              <h4>{countStore}</h4>
              <span>Total Stores</span>
            </div>
          </div>

          <div class="shop-box">
            <span className="image">
              <img src={salary} alt="Logo" style={{ width: "30px" }} />
            </span>
            <div className="shop-box-container">
              <h4>{plus}$</h4>
              <span>Send Amount</span>
            </div>
          </div>

          <div class="shop-box">
            <span className="image">
              <img src={dollar} alt="Logo" style={{ width: "30px" }} />
            </span>
            <div className="shop-box-container">
              <h4>{minus}$</h4>
              <span>Left Amount</span>
            </div>
          </div>

          <div class="shop-box">
            <span className="image">
              <img src={fee} alt="Logo" style={{ width: "30px" }} />
            </span>
            <div className="shop-box-container">
              <h4>{serviceFee}$</h4>
              <span>Profit </span>
            </div>
          </div>

          <div class="shop-box">
            <span className="image">
              <img src={schedule} alt="Logo" style={{ width: "30px" }} />
            </span>
            <div className="shop-box-container">
              <h4>Date</h4>
              <DatePicker
                defaultValue={moment()}
                format={dateFormat}
                onChange={onChange}
              />
            </div>
          </div>
          {/* Table */}
        </div>
        <Table
          columns={columns}
          dataSource={initialValue}
          pagination={false}
          scroll={{ x: "max-content", y: 540 }}
        />
      </div>
    </ProductContext.Provider>
  );
}

export default ViewDailyShop;

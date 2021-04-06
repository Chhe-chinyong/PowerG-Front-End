import React, { useRef, useEffect, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import logo from "../../images/favicon.ico";
import axios from "axios";
import { Button, Table } from "antd";
import moment from "moment";

export class PDFList extends React.Component {
  state = {
    value: [],
    listId: "",
    deliveryManName: "",
  };

  componentDidMount() {
    // this.props.setClick(false);
  }
  componentDidUpdate(prevProps, prevState) {
    // Runs after the first render() lifecycle
    console.log("prevProps", prevProps);
    console.log(this.props.click);
    if (this.props.productList !== prevProps.productList) {
      const listId = this.props.productList.listId;
      const deliveryManName = this.props.productList.deliveryManName;
      console.log(listId);
      const fetchItem = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_DOMAIN}/packageList/getListById/${listId}`
          );
          // setProductList(result);
          console.log(result.data.data);
          this.setState({
            listValue: listId,
            value: result.data.data,
            deliveryManName: deliveryManName,
          });
        } catch (error) {
          console.log("error" + error);
        }
      };
      fetchItem();
      console.log("fectch api");
    }
  }

  render() {
    const columns = [
      {
        //title is display on coulmn
        //dataIndex to match with datasouce to display
        title: <strong>ល.រ</strong>,
        dataIndex: "package_id",
        key: "package_id",
      },
      {
        title: <strong>អតិថិជន</strong>,
        dataIndex: "shop_owner",
        key: "shop_owner",
      },

      {
        title: <strong>ទីតាំង</strong>,
        dataIndex: "cust_location",
        key: "cust_location",
        className: "pro-location",
      },

      {
        title: <strong> លេខទូរស័ព្ទ</strong>,
        dataIndex: "cust_phone",
        key: "cust_phone",
      },

      {
        title: <strong> ម្លៃសេវា</strong>,
        dataIndex: "service_fee",
        key: "service_fee",
      },

      {
        title: <strong>តម្លៃទំនិញ</strong>,
        dataIndex: "pro_price",
        key: "pro_price",
      },

      {
        title: <strong>ការបង់ថ្លៃទំនិញ</strong>,
        dataIndex: "service_paid_by",
        key: "service_paid_by",
      },

      {
        title: <strong>ការបង់ថ្លៃសេវា</strong>,
        dataIndex: "payment_method",
        key: "payment_method",
      },

      // {
      //   title: <strong>Delivery By</strong>,
      //   dataIndex: "DeliveryID",
      //   key: "DeliveryID",
      // },

      // {
      //   title: <strong>Date</strong>,
      //   dataIndex: "created_at",
      //   key: "date",
      // },
    ];
    // console.log(this.props);
    // console.log(this.props.productList.listId);
    // console.log(this.state.value);
    return (
      <>
        {/* <div className="pdf-header">
          <img src={logo} alt="Logo" className="pdf-logo" />
          <p>
            {/* Change*/}

        {/* </p> */}
        {this.state.value && (
          <div
            className="center-pdf"
            style={{
              display: this.props.click ? "block" : "none",
            }}
          >
            <div className="pdf-list-header">
              <div>
                <img src={logo} alt="Logo" className="pdf-list-header-logo" />
                <p>ឈ្មោះអ្នកដឹក :{this.state.deliveryManName}</p>
                <p>លេខបញ្ជី :{this.state.listValue}</p>
                {/* <p>ពេលដឹក</p> */}
              </div>
              <div className="text-align">
                <h1>តារាងដឹកជញ្ចួន</h1>
                {/* <p>ការបរិច្ជេទ: {this.state.value[0].created_at}</p> */}
                <p className="listDate">
                  ការបរិច្ជេទ:{" "}
                  {this.state.value[0] ? this.state.value[0].created_at : null}
                </p>
                <p className="listPhone">
                  លេខទូរស័ព្ទ: 099 589 689 / 081 335 965
                </p>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={this.state.value}
              bordered
              pagination={false}
              // className="PDF-table-list"
            />
            <p className="pdf-website">www.powergdelivery.com</p>
          </div>
        )}
      </>
    );
  }
}

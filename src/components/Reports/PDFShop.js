import React, { useRef, useEffect, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import logo from "../../images/favicon.ico";
import axios from "axios";
import { Button, Table } from "antd";
import moment from "moment";

export class PDFShop extends React.Component {
  state = {
    value: null,
    listId: "",
    deliveryManName: "",
  };

  // componentDidMount() {
  //   console.log(this.props.productList)
  // }
  
  componentDidUpdate(prevProps, prevState) {
    // Runs after the first render() lifecycle
    console.log(this.props.productList)
    const product = this.props.productList;
    console.log(product)
   
    
    console.log("prevProps", prevProps);
    // console.log(this.props.click);
    if (this.props.productList !== prevProps.productList) {
      const listId = this.props.productList.listId;
      const deliveryManName = this.props.productList.deliveryManName;
      console.log(listId);
      this.setState({
        value: product
      });
      console.log(this.state)
   
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
      // {
      //   title: <strong>អតិថិជន</strong>,
      //   dataIndex: "shop_owner",
      //   key: "shop_owner",
      // },

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
        title: <strong> ម្លៃសេវា</strong>,
        dataIndex: "service_fee",
        key: "service_fee",
      },

      {
        title: <strong>ការបង់ថ្លៃសេវា</strong>,
        dataIndex: "payment_method",
        key: "payment_method",
      },

      {
        title: <strong>ការបង់ថ្លៃសេវា</strong>,
        dataIndex: "payment_method",
        key: "payment_method",
      },

      
      {
        title: <strong>ស្ថានភាព</strong>,
        dataIndex: "status",
        key: "status",
      },

      {
        title: <strong>Total</strong>,
        dataIndex: "subtotal",
        key: "subtotal",
      },

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
          
          >
            <div className="pdf-list-header">
              <div>
                <img src={logo} alt="Logo" className="pdf-list-header-logo" />
                <p>ឈ្មោះហាង :{this.state.value[0] ? this.state.value[0].shop_owner : null} </p> 
              </div>
              <div className="text-align">
                <h1 className="invoice">Invoice</h1>
                {/* <p>ការបរិច្ជេទ: {this.state.value[0].created_at}</p> */}
                <p className="listDate">
                  ការបរិច្ជេទ:{" "}
                  {this.state.value[0] ? this.state.value[0].created_at : null}
                </p>
                <p className="listPhone">
                  លេខទូរស័ព្ទ: 099 589 689 / 081 335 965
                </p>
                <p className="listPhone">www.powergdelivery.com</p>
              </div>
              
            </div>

            {/* Status success */}
            <div className="status-column">
                  <div className="status-box1">
                    <p>DELIVERED TODAY</p>
                    <h3>{0}</h3>
                  </div>

                  <div className="status-box2">
                    <p>SUCCESS</p>
                    <h3>{0}</h3>
                  </div>

                  <div className="status-box4">
                    <p>RETURNED </p>
                    <h3>{0}</h3>
                  </div>
            </div>
              <Table
              columns={columns}
              // dataSource={[1,2,3]}
              dataSource={this.state.value}
              bordered
              pagination={false}
              // className="PDF-table-list"
            />

            {/* Total_Amount */}
            <div className="total_amount">
                <p>
                  TOTAL AMOUNT:{}
                  <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}  >
                  $1000 
                  </span>
                </p>
            </div>
           
          </div>
        )}
      </>
    );
  }
}
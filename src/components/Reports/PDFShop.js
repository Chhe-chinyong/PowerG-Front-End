import React, { useRef, useEffect, useState } from "react";
import logo from "../../images/favicon.ico";
import axios from "axios";
import {  Empty, Table } from "antd";

export class PDFShop extends React.PureComponent {
  state = {
    value: null,
    status: {},
    reasons: {}
  };


  
  componentDidUpdate(prevProps, prevState) {
    // Runs after the first render() lifecycle
 
    const products = this.props.productList;
   
   
    
   
    if (this.props.productList !== prevProps.productList) {
      const listId = this.props.productList.listId;
      const deliveryManName = this.props.productList.deliveryManName;
      
        
      const filter =  products.filter((product)=> product.status === 'UNSUCCESS');
      this.setState({
        value: products,
        reasons:filter
      });
     
      // Fetch data
      const fetchItem = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_DOMAIN}/shop/dailyShopReport`,
            {
              params: {date:this.props.date, shop:this.props.shop},
              headers: { "auth-token": localStorage.getItem("token")}
             }
          ); 
          this.setState({
            status:result.data
          });
        } catch (error) {
            console.error('error from fetch data')
        }
      };
      // if (!this.props.shop  )
      // {
      //   console.log('hi')
      //   fetchItem();
      // }

     
      // if(products !== Empty)
      // {
      //   fetchItem();
      // }

      if (this.props.productList)
        fetchItem();
     
       
    }
  }

  render() {
    const columns = [
      {
        //title is display on coulmn
        //dataIndex to match with datasouce to display
        title: <strong>ល.រ</strong>,
        dataIndex: "package_id",
        key: "id",
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
        title: <strong>តម្លៃទំនិញ</strong>,
        dataIndex: "pro_price",
        key: "pro_price",
        render:(text)=>{
          return <span>${text}</span>
      }
      },

      {
        title: <strong>ការបង់ថ្លៃទំនិញ</strong>,
        dataIndex: "payment_method",
        key: "payment_method",
      },

      // {
      //   title: <strong>ការបង់ថ្លៃទំនិញ</strong>,
      //   dataIndex: "service_paid_by",
      //   key: "service_paid_by",
      // },

      {
        title: <strong> ម្លៃសេវា</strong>,
        dataIndex: "service_fee",
        key: "service_fee",
        render:(text)=>{
          return <span>${text}</span>
      }
      },

      {
        title: <strong>ការបង់ថ្លៃសេវា</strong>,
        dataIndex: "service_paid_by",
        key: "service_paid_by",
      },

     

      
      {
        title: <strong>ស្ថានភាព</strong>,
        dataIndex: "status",
        key: "status",
      },

      {
        title: <strong>តម្លៃសរុប</strong>,
        dataIndex: "package_price",
        key: "subtotal",
        render:(text)=>{
          return <span>${text}</span>
      }
      },

    ];
   
    return (
      <>
        {this.state.value && this.state.reasons && (
          <div
            className="center-pdf"
          
          >
            <div className="pdf-list-header">
              <div>
                <img src={logo} alt="Logo" className="pdf-list-header-logo" />
                <p > <span className="store-name">ឈ្មោះហាង :</span>{this.state.value[0] ? this.state.value[0].shop_owner : null} </p> 
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
                    <p>សរុបការដឹក</p>
                    <h3>{this.state.status.total_package}</h3>
                  </div>

                  <div className="status-box2">
                    <p>ដឺកជេាគជ័យ</p>
                    <h3>{this.state.status.success}</h3>
                  </div>

                  <div className="status-box4">
                    <p>ដឹកបរាជ័យ</p>
                    <h3>{this.state.status.unsuccess}</h3>
                  </div>
            </div>
              <Table
              columns={columns}
              dataSource={this.state.value}
              bordered
              pagination={false}
              
            />

            {/* Total_Amount */}
            <div className="footer-pdfShop">
                <div className="unsuccess-note">
                    <p className="unsuccess-note-note">សំគាល់:</p>
                    

                     {this.state.reasons.map((reason) => 
                        <p className="unsuccess-reason"> 
                            {reason.package_id}: {reason.others}
                       </p>)}       
                                    
                </div>
                <div className="total_amount">
                    <p>
                      សរុបទឹកប្រាក់:{}
                      <span style={{ color: "#e74c3c", fontSize: "1.25rem" }}  >
                      {"$"}{this.state.status.total_amount}
                      </span>
                    </p>
                </div>

            </div>
           
           
          </div>
        )}
      </>
    );
  }
}

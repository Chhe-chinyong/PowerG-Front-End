import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Divider } from "antd";

function Chart() {
  // State
  const [initialValue, setInitialValue] = useState({});
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const tgai = moment().format('YYYY/M/D');
        const delivery_report = await axios(
          `${process.env.REACT_APP_DOMAIN}/shop/dailyReport`,
          {
            params:{
              date:tgai
            },
              headers: { "auth-token": localStorage.getItem("token")
             
          }
          }
        );
  
        const status = delivery_report.data;
        console.log(delivery_report.data)
       
        console.log('status',status)
        setInitialValue(status);
      } catch (error) {

          setInitialValue({
            total_package:'0',
            success: '0',
            unsuccess:'0',
            ongoing:'0',
            total_amount:'0'
          });
  
        
      }
     
    };
    fetchItem();
    console.log("first", initialValue);
  }, []);
  return (

      <div className="container-box">
        <div className="box1">
          <p>DELIVERED TODAY</p>
          <h3>{initialValue.total_package}</h3>
        </div>
    
        <div className="box2">
          <p>ON GOING</p>
          <h3>{initialValue.ongoing}</h3>
        </div>
        <div className="box3">
          <p>SUCCESS</p>
          <h3>{initialValue.success}</h3>
        </div>
        <div className="box4">
          <p>RETURNED </p>
          <h3>{initialValue.unsuccess}</h3>
        </div>
      </div>

  );
}

export default Chart;


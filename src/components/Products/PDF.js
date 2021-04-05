import React, { useRef, useEffect } from "react";
import ReactToPdf from "react-to-pdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Button } from "antd";
import QRCode from "react-qr-code";
import logo from "../../images/favicon.ico";
import packagePng from "../../images/package.png";
import location from "../../images/location.png";
import moment from "moment";
const options = {
  orientation: "landscape",
  unit: "in",
  format: [4, 2],
};
const PDF = ({ productData, package_id }) => {
  console.log(productData);
  if (productData.service_fee === undefined) {
    productData.service_fee = 4000;
  }
  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });
  useEffect(() => {
    const fetchItem = () => {
      try {
        // const result = axios.get(`15605.94949/get/${pro_id}`);
      } catch (error) {
        console.log("error" + error);
      }
    };
    fetchItem();
  }, []);
  return (
    <>
      <div className="btnPdf-container" ref={refPrint}>
        {/* <ReactToPdf
          targetRef={refPrint}
          filename="qr-package.pdf"
          options={options}
          //   x={0.5}
          //   y={0.5}
        >
          {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
        </ReactToPdf> */}
        <div ref={refPrint} className="pdf-container">
          {/* Header */}
          <div className="pdf-header">
            <img src={logo} alt="Logo" className="pdf-logo" />
            <p>
              {/* Change*/}
              ID <span>094958189</span>
            </p>
          </div>

          {/* Body */}
          <div className="pdf-information">
            {/* change */}
            <p className="pdf-date">
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
              {/* 2021-01-1, 12h:30m */}
              {/* moment().format('l');    // 3/11/2021 */}
            </p>
            <div className="pdf-sender">
              <img src={packagePng} alt="package.png" />
              អ្នកផ្ញើ ៖{/* <pre> : </pre> */}
              <span> {productData.shop_owner}</span>
            </div>
            <div className="pdf-receiver">
              <img src={location} alt="location.png" />
              អ្នកទទួល ៖{/* <pre> :</pre>{" "} */}
              <span>
                {" "}
                {productData.cust_phone}, {productData.cust_location}.
              </span>
            </div>
          </div>

          <div className="pdf-price">
            <div className="pdf-priceTag">
              <p>តម្លៃដឹកជញ្ជួន</p>
              {/* Change */}
              <h3 className="price">៛ {productData.service_fee}</h3>
            </div>
            <div className="pdf-cod">{productData.payment_method}</div>
            <figure>
              <QRCode
                value={`http://192.168.1.212:3000/qr/${package_id}`}
                size={120}
              />
              <figcaption>Scan me</figcaption>
            </figure>
          </div>

          <p className="pdf-website">www.powergdelivery.com</p>

          {/* <h2>shop's Owner:{productData.shop_owner}</h2>
          <p>Location: {productData.cust_location}</p>
          <h2>Product-ID convert to QR code</h2> */}
        </div>

        {/* <ReactToPdf
          targetRef={refPrint}
          filename="qr-package.pdf"
          scale={1}
          x={30}
          y={5}
        >
          {({ toPdf }) => (
            <Button type="primary" onClick={toPdf} className="btnPdf">
              Generate pdf
            </Button>
          )}
        </ReactToPdf> */}
      </div>
      <div className="pdfBtnContainer">
        <Button type="primary" onClick={handlePrint} className="btnPdf">
          Generate pdf
        </Button>
      </div>
    </>
  );
};

export default PDF;

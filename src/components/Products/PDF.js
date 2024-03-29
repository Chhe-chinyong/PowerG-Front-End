import React, { useRef, useEffect } from "react";
import { useReactToPrint, ReactToPrint } from "react-to-print";
// import ReactToPrint from "react-to-print";
import { Button } from "antd";
import QRCode from "react-qr-code";
import logo from "../../images/favicon.ico";
// import logo from "../../images/power.png";
import packagePng from "../../images/package.png";
import location from "../../images/location.png";
import moment from "moment";
const pageStyle = `{ size: 2.5in 4in}`;

const PDF = ({ productData, package_id }) => {
  if (productData.service_fee === undefined) {
    productData.service_fee = 4000;
  }

  const check = (productData) => {
    if (productData.service_paid_by === "Transferer")
      productData.service_paid_by = "អ្នកផ្ញេី";
    if (productData.service_paid_by === "Receiver")
      productData.service_paid_by = "អ្នកទទួល";
  };

  const padToEight = (number) => {
    if (number < 9999999) {
      number = ("0000000" + number).slice(-8);
    }
    return number;
  };
  // change data to khmer
  check(productData);
  var id = padToEight(package_id);

  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });

  return (
    <>
      {/* <div className="btnPdf-container" ref={refPrint}> */}
      <page size="A4" className="btnPdf-container" ref={refPrint}>
        <div ref={refPrint} className="pdf-container">
          {/* Header */}
          <div className="pdf-header">
            <img src={logo} alt="Logo" className="pdf-logo" />
            <p>
              {/* Change*/}
              ID: <span>{id}</span>
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
              <p>តម្លៃទំនិញ</p>
              {/* <p>តម្លៃដឹកជញ្ជួន</p> */}
              {/* Change */}
              <h3 className="price">
                $ {productData.pro_price}{" "}
                <span className="product_paid_by">
                  ({productData.payment_method})
                  {/* ({productData.pro_price}) */}
                </span>{" "}
              </h3>
              {/* <h3 className="price">$ {productData.service_fee} <span className="product_paid_by">({productData.service_paid_by})</span> </h3> */}
            </div>

            {/* Start តម្លៃដឹកជញ្ជួន */}
            {/* <div className="pdf-cod">
              <p className="pdf-cod-title">តម្លៃដឹកជញ្ជួន</p>
              <p className="product_payment">
                ${productData.service_fee}{" "}
              </p>{" "}
              <p className="product_price"> ({productData.service_paid_by})</p>
            </div> */}
            {/* End តម្លៃដឹកជញ្ជួន */}
            <figure>
              <QRCode
                value={`https://powergdelivery.com/qr/${package_id}`}
                size={192}
                className="qrcode"
              />
              <figcaption className="scan">Scan me</figcaption>
            </figure>
          </div>

          <p className="pdf-website">www.powergdelivery.com</p>
        </div>
      </page>
      <div className="pdfBtnContainer">
        <Button type="primary" onClick={handlePrint} className="btnPdf">
          Generate pdf
        </Button>
      </div>
    </>
  );
};

export default PDF;

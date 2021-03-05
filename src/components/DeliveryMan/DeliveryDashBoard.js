import React from "react";
import { Table, Tag, Space } from "antd";
import DeliveryHeader from "../DeliveryMan/DeliveryHeader";

const columns = [
  {
    title: "PRODUCT ID",
    dataIndex: "productId",
    key: "productId",
    className: "columns",
    // width: 100,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "LOCATION",
    dataIndex: "location",
    key: "location",
    className: "columns",
  },
  {
    title: "CONTACT",
    dataIndex: "contact",
    key: "contact",
    className: "columns",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    className: "columns",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    className: "columns",
  },
];
const data = [
  {
    key: "1",
    productId: "000001",
    location: "New York No. 1 Lake Park",
    contact: "012394858",
    price: "3.5$",
    status: "SUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
  {
    key: "2",
    productId: "000002",
    location: "New York No. 1 Lake Park",
    contact: "099384757",
    price: "3.5$",
    status: "UNSUCCESS",
  },
];

function DeliveryDashBoard() {
  return (
    <div>
      <DeliveryHeader />
      <div className="content">
        <p className="content-header">TO BE DELIVER</p>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 500 }}
          pagination={false}
          style={{ padding: "0 1rem" }}
        />
      </div>
    </div>
  );
}

export default DeliveryDashBoard;

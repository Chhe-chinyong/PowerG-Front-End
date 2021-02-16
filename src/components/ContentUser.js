import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

// Component;
import ContentUserAdd from "./ContentUserAdd";
function ContentUser() {
  const [click, setClick] = useState(false);

  //   Event-handler
  const handleClick = (e) => {
    console.log("Clicked me");
    setClick((prevClicked) => (prevClicked ? false : true));
    console.log(click);
    // <ContentUserAdd />;
  };

  const columns = [
    {
      //title is display on coulmn
      //dataIndex to match with datasouce to display
      title: <strong>ID</strong>,
      dataIndex: "Id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <strong>USERNAME</strong>,
      dataIndex: "Username",
      key: "username",
    },
    {
      title: <strong>PASSWORD</strong>,
      dataIndex: "Password",
      key: "password",
    },
    {
      title: <strong>CONTACT</strong>,
      dataIndex: "Contact",
      key: "contact",
    },
    {
      title: <strong>ACTION</strong>,
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="noOutLine removeUser"
            icon={<DeleteOutlined />}
          ></Button>
          <Button
            className="noOutLine editUser"
            icon={<EditOutlined />}
          ></Button>
          {/* <a>Invite {record.name}</a> */}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      Id: "000001",
      Username: "Kok dara",
      Password: "901294012940214",
      Contact: "0129928475",
    },
    {
      key: "2",
      Id: "000002",
      Username: "Mingthean Lay",
      Password: "901294012940214",
      Contact: "0129928475",
    },
    {
      key: "3",
      Id: "000003",
      Username: "Phal sokheng",
      Password: "901294012940214",
      Contact: "0129928475",
    },
  ];
  return (
    <>
      <Button
        className="userAdd "
        icon={<UserAddOutlined />}
        onClick={handleClick}
      >
        ADD
      </Button>
      <Table columns={columns} dataSource={data} />
      {/* Condition */}
      {click ? <ContentUserAdd /> : <></>}
    </>
  );
}

export default ContentUser;

// {
//     title: "T",
//     key: "tags",
//     dataIndex: "tags",
//     render: (tags) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? "geekblue" : "green";
//           if (tag === "loser") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },

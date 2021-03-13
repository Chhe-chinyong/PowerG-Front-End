import React, { useContext } from "react";
import { Layout } from "antd";
import { Avatar, Image, Menu, Dropdown, Button } from "antd";
import { UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  AuthContext,
  RoleContext,
  UsernameContext,
} from "../context/AuthContext";
const { Header } = Layout;
function HeaderBar({ title }) {
  //State
  const { loginStatus, setLoginStatus } = useContext(AuthContext);
  const { roleStatus, setRoleStatus } = useContext(RoleContext);
  const { userNameStatus, setUsernameStatus } = useContext(UsernameContext);
  // Event
  const handleLogout = () => {
    console.log("hi there");
    setLoginStatus(false);
    setRoleStatus("");
    localStorage.removeItem("token");
    localStorage.removeItem("u_role");
  };
  // menu for dropdown avatar
  const menu = (
    <Menu className="admin-avatar">
      <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="headerBar-container">
      <h5 style={{ margin: "0" }}>{title}</h5>
      <div className="deliveryMan">
        <Dropdown overlay={menu} placement={"topRight"} arrow={true}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar
              style={{
                backgroundColor: "#F05454",
                marginRight: "0.5rem",
              }}
              alt="user Avatar"
              icon={<UserOutlined />}
              gap={30}
              size="small"
            />
            <span className="headerName">{userNameStatus}</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderBar;

// {
//   /* <h5 style={{ margin: "0" }}>{title}</h5> */
// }

// display: "flex",
// height: "72px",
// alignItems: "center",
// paddingLeft: "40px",

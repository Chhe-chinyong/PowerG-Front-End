import React, { useContext } from "react";
import logo from "../../images/favicon.ico";
import { Avatar, Image, Menu, Dropdown, Button } from "antd";
import { UserOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  AuthContext,
  RoleContext,
  UsernameContext,
} from "../../context/AuthContext";
import { Redirect } from "react-router";

function DeliveryHeader() {
  //State
  const { loginStatus, setLoginStatus } = useContext(AuthContext);
  const { roleStatus, setRoleStatus } = useContext(RoleContext);
  const { userNameStatus, setUsernameStatus } = useContext(UsernameContext);
  const handleLogout = () => {
    setLoginStatus(false);
    setRoleStatus("");
    localStorage.removeItem("token");
    localStorage.removeItem("u_role");
  };
  // menu for dropdown avatar
  const menu = (
    <Menu className="deliveryLogOut">
      <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
    // <Menu>
    //   <Menu.Item>
    //     <Button onClick={handleLogout}>Logout1</Button>
    //   </Menu.Item>
    // </Menu>
  );
  return (
    <header className="header">
      <div className="header-bar">
        <img src={logo} alt="logo" className="delivery-logo" />
        <div className="deliveryMan">
          <Dropdown overlay={menu} placement={"topRight"} arrow={true}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
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
              <span className="name">{userNameStatus}</span>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <p className="deliveryDate"> 21 January 2021</p>
      <div className="listId">#0959828</div>
    </header>
  );
}

export default DeliveryHeader;

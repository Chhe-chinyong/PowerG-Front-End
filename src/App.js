import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "ant-design-pro/dist/ant-design-pro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "antd";
// Components
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Products from "./components/Products";
import Users from "./components/Users";
import Home from "./components/Home";
import HeaderBar from "./components/HeaderBar";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLogin from "./components/PrivateLogin";
import QrCode from "./components/QrCode";
import {
  AuthContext,
  RoleContext,
  UsernameContext,
} from "./context/AuthContext";
import DeliveryDashBoard from "./components/DeliveryMan/DeliveryDashBoard";
import ReportDelivery from "./components/Reports/ReportDelivery";
import ReportShop from "./components/Reports/ReportShop";
import HomePage from "./components/HomePage";
import ContentList from "./components/ListAndShop/ContentList";

// Style
import "./style/app.css";
// import ReportDelivery from "./components/Reports/ReportDelivery";
// import { UserLogin } from "./components/Users/UserLogin";

// Destructuring
const { Content, Sider } = Layout;

function App() {
  // Convert pathname set to header
  // const firstPath = window.location.pathname.split("/")[1];
  // const path = firstPath.charAt(0).toUpperCase() + firstPath.slice(1);

  // State
  const [collapsed, setCollapse] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [roleStatus, setRoleStatus] = useState("");
  const [userNameStatus, setUsernameStatus] = useState("");

  // const [title, setTitle] = useState(path);
  const [title, setTitle] = useState("Dashboard");
  const handleCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapse(collapsed);
  };
  console.log("login status", loginStatus);

  // UseEffect
  useEffect(() => {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("u_role");
    const username = localStorage.getItem("u_username");
    console.log("token", user);
    console.log("role", role);
    if (user) {
      setLoginStatus(true);
      setRoleStatus(role);
      setUsernameStatus(username);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      <RoleContext.Provider value={{ roleStatus, setRoleStatus }}>
        <UsernameContext.Provider value={{ userNameStatus, setUsernameStatus }}>
          <Router>
            <div className="App">
              <Switch>
                {/* Home Page */}
                <PrivateLogin
                  path="/"
                  exact
                  component={HomePage}
                  auth={loginStatus}
                  role={roleStatus}
                />
                {/* Login page*/}
                <PrivateLogin
                  path="/login"
                  exact
                  component={Home}
                  auth={loginStatus}
                  role={roleStatus}
                />
                {/* Delivery man */}
                <PrivateRoute
                  path="/delivery"
                  component={DeliveryDashBoard}
                  auth={loginStatus}
                />
                {/* Scan QR code page */}
                <Route path="/qr/:pro_id" component={QrCode}  />

                <Layout>
                  <Sider
                    theme="light"
                    style={{ minHeight: "100vh" }}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={handleCollapse}
                    breakpoint="lg"
                    theme="light"
                  >
                    <NavBar title={title} setTitle={setTitle} />
                  </Sider>

                  <Layout style={{ background: "F2F3F6" }}>
                    <HeaderBar title={title} />

                    <Content>
                      {/* anything under switch will stop if first path match in */}
                      {/* <Route path="/" exact component={Home} /> */}
                      <Switch>
                        <PrivateRoute
                          path="/dashboard"
                          component={() => <DashBoard title={title} />}
                          auth={loginStatus}
                          // render={() => <DashBoard title={title} />}
                          title={title}
                          exact
                        />
                        <PrivateRoute path="/products" component={Products} auth={loginStatus}/>
                        <PrivateRoute
                          path="/reportDelivery"
                          component={ReportDelivery}
                          auth={loginStatus}
                        />

                        <PrivateRoute
                          path="/reportShop"
                          component={ReportShop}
                          auth={loginStatus}
                        />
                        {/* List & Shop */}
                        <PrivateRoute
                          path="/listAndShop"
                          component={ContentList}
                          auth={loginStatus}
                        />
                        {/* <Route path="/users" component={Users} /> */}
                        <PrivateRoute
                          path="/users"
                          component={Users}
                          auth={loginStatus}
                        />
                        <Redirect from="*" to="/" />

                      </Switch>
                  
                    </Content>      
                       
                  </Layout>
                </Layout>
                  
              </Switch>
              
            </div>
          </Router>
        </UsernameContext.Provider>
      </RoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;


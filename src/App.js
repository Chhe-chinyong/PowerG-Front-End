import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "ant-design-pro/dist/ant-design-pro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Menu, Button } from "antd";
// Components
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Products from "./components/Products";
import Report from "./components/Report";
import Users from "./components/Users";
import Home from "./components/Home";
import HeaderBar from "./components/HeaderBar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import Exception from "ant-design-pro/lib/Exception";

// Style
import "./style/app.css";
import { UserLogin } from "./components/Users/UserLogin";

// Destructuring
const { Content, Sider } = Layout;

function App() {
  // Convert pathname set to header
  const firstPath = window.location.pathname.split("/")[1];
  const path = firstPath.charAt(0).toUpperCase() + firstPath.slice(1);

  // State
  const [collapsed, setCollapse] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  // const [title, setTitle] = useState(path);
  const [title, setTitle] = useState("Dashboard");
  const handleCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapse(collapsed);
  };
  console.log("login status", loginStatus);
  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
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
                    <Route
                      path="/dashboard"
                      render={() => <DashBoard title={title} />}
                      title={title}
                      exact
                    />
                    <Route path="/products" component={Products} />
                    <Route path="/report" component={Report} />
                    {/* <Route path="/users" component={Users} /> */}
                    <PrivateRoute
                      path="/users"
                      component={Users}
                      auth={loginStatus}
                    />
                    <Route path="*" exact>
                      <Exception
                        type="404"
                        title="Page not found"
                        actions={
                          <div>
                            <Button type="primary" r>
                              <a href="/">Home</a>
                            </Button>
                          </div>
                        }
                        desc="please click on button to redirect to homepage"
                      />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>

            {/* Error */}
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Menu } from "antd";
// Components
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Products from "./components/Products";
import Report from "./components/Report";
import Users from "./components/Users";
import Home from "./components/Home";
import HeaderBar from "./components/HeaderBar";

// Style
import "./style/app.css";

// Destructuring
const { Content, Sider } = Layout;

function App() {
  // State
  const [collapsed, setCollapse] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const handleCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapse(collapsed);
  };

  return (
    <Router>
      <div className="App">
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
              <Switch>
                {/* anything under switch will stop if first path match in */}
                <Route path="/" exact component={Home} />
                <Route
                  path="/dashboard"
                  render={() => <DashBoard title={title} />}
                  title={title}
                />
                <Route path="/products" component={Products} />
                <Route path="/report" component={Report} />
                <Route path="/users" component={Users} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

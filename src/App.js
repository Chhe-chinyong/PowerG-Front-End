import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Menu, Breadcrumb } from "antd";
// Components
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import Products from "./components/Products";
import Report from "./components/Report";
import Users from "./components/Users";
import Home from "./components/Home";
// Style
import "./style/app.css";

// Destructuring
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Sider>
            <div className="side-bar">
              <NavBar />
            </div>
          </Sider>
          <Layout style={{ background: "F2F3F6" }}>
            <Header style={{ background: "white", height: "80px" }}>
              Hey header
            </Header>
            <Content>
              <Switch>
                {/* anything under switch will stop if first path match in */}
                <Route path="/" exact component={Home} />
                <Route path="/dashboard" component={DashBoard} />
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

import { Layout, Space } from "antd";
import "./App.scss";
import MainView from "./components/MainView";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const layoutStyle = { display: "flex" };

const siderStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
  rowGap: "10px",
  alignContent: "center",
};

const pages = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About Page",
  },
];

const contentStyle = { padding: "0 48px", minHeight: "100vh" };

function App() {
  return (
    <Layout style={layoutStyle} className="App">
      <Sider width="15%">
        <Space
          direction="vertical"
          className="options"
          style={{ flex: 1, minWidth: 0, fontSize: "1.2rem" }}
        >
          {pages.map((page) => (
            <NavLink
              to={page.path}
              style={({ isActive }) => {
                return isActive ? { color: "white" } : {};
              }}
            >
              {page.name}
            </NavLink>
          ))}
          {/* <NavLink
            to={"/"}
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
          >
            Home
          </NavLink>
          <NavLink to={"/about"}>About Page</NavLink> */}
        </Space>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    // <div className="App">
    //   <MainView />
    // </div>
  );
}

export default App;

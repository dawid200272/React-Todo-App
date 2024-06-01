import { Layout, Space } from "antd";
import "./App.scss";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

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
      <Sider width="15%" style={siderStyle}>
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
        </Space>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

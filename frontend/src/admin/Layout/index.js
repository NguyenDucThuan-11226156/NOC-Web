import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FilterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme, Typography } from "antd";
import "./LayoutAdmin.css";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
const { Header, Sider, Content } = Layout;

const AppAdmin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  useEffect(() => {
    const token = cookies.tokenAdmin;
    if (!token) {
      window.location.href = "/admin/login";
    }
  });
  return (
    <Layout className="layout-admin">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width="200px"
        className="sider"
      >
        <div className="demo-logo-vertical">
          <div
            className={`logo-menu ${collapsed ? "logo-menu-collapsed" : ""}`}
          >
            {!collapsed ? (
              <>
                <div className="logo-item">
                  <img
                    src="https://i.pinimg.com/736x/4e/5b/1e/4e5b1e974d475aaa999dec762ab3c913.jpg"
                    alt="logo-admin-page"
                  />
                </div>
                <div className="logo-item">
                  <img
                    src="https://i.ytimg.com/vi/_mPDAQm58i8/maxresdefault.jpg"
                    alt="logo-admin-page"
                  />
                </div>
                <div className="logo-item">
                  <img
                    src="https://i.pinimg.com/564x/3e/c2/55/3ec255dd1ec666b68c524ccf66494c95.jpg"
                    alt="logo-admin-page"
                  />
                </div>
              </>
            ) : (
              <div className="logo-item">
                <img
                  src="https://inkythuatso.com/uploads/images/2021/11/logo-neu-inkythuatso-01-09-09-40-17.jpg"
                  alt="logo-admin-page"
                />
              </div>
            )}
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          className="menu-admin"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Mentors",
              onClick: () => navigate("/admin"),
            },
            {
              key: "2",
              icon: <FilterOutlined />,
              label: "Catagories",
              onClick: () => navigate("/admin/category"),
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: "Settings General",
              onClick: () => navigate("/admin/setting"),
            },
          ]}
        />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Sider>
      <Layout>
        <Header
          // style={{
          //   padding: '10px 0 0 0',
          //   background: colorBgContainer,
          //   position: 'fixed',
          // }}
          className="header-admin"
        >
          <div className="header-title">
            <Typography level={1} className="header-main-title">
              NDM Dashboard
            </Typography>
            <Typography level={3} className="header-sub-title">
              Welcome Back!
            </Typography>
          </div>
          <Avatar className="admin-avatar" size={60}></Avatar>
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#EFF3F4",
            // borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppAdmin;

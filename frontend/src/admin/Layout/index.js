import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FilterOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Layout,
  Menu,
  Dropdown,
  Typography,
  theme,
} from "antd";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./LayoutAdmin.css";
import { useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [path, setPath] = useState(["1"]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [cookies, , removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });

  useEffect(() => {
    const token = cookies.tokenAdmin;
    if (!token) {
      navigate("/admin/login");
    }

    const pathMap = {
      "/admin": ["1"],
      "/admin/category": ["2"],
      "/admin/setting": ["3"],
    };

    setPath(pathMap[location.pathname] || ["1"]);
  }, [cookies, location]);

  const deleteAdminTokenCookie = () => {
    document.cookie =
      "tokenAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
  };

  const handleLogout = () => {
    deleteAdminTokenCookie();
    navigate("/admin/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
                    aria-label="logo"
                  />
                </div>
                <div className="logo-item">
                  <img
                    src="https://i.ytimg.com/vi/_mPDAQm58i8/maxresdefault.jpg"
                    alt="logo-admin-page"
                    aria-label="logo"
                  />
                </div>
                <div className="logo-item">
                  <img
                    src="https://i.pinimg.com/564x/3e/c2/55/3ec255dd1ec666b68c524ccf66494c95.jpg"
                    alt="logo-admin-page"
                    aria-label="logo"
                  />
                </div>
              </>
            ) : (
              <div className="logo-item">
                <img
                  src="https://inkythuatso.com/uploads/images/2021/11/logo-neu-inkythuatso-01-09-09-40-17.jpg"
                  alt="logo-admin-page"
                  aria-label="collapsed logo"
                />
              </div>
            )}
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          className="menu-admin"
          selectedKeys={path}
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
              label: "Categories",
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
          aria-label="toggle sidebar"
        />
      </Sider>
      <Layout>
        <Header className="header-admin">
          <div className="header-title">
            <Typography.Title level={1} className="header-main-title">
              NDM Dashboard
            </Typography.Title>
            <Typography.Text className="header-sub-title">
              {/* Welcome Back! */}
            </Typography.Text>
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              className="admin-avatar"
              size={60}
              aria-label="admin avatar"
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "#EFF3F4",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppAdmin;

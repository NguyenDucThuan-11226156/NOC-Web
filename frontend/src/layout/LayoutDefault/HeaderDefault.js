import { Avatar, Button, Col, Dropdown, Menu, Row, Drawer } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ForgotPassword from "../../components/ForgotPW";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import axios from "axios";
import logoNCC from "../../images/logo/Logo-NCC.svg";
import logoNEU from "../../images/logo/Logo-Neu.svg";
import logoNOC from "../../images/logo/NOC-black.svg";
import logoNDM from "../../images/logo/NOC-white.svg";
import "./LayoutDefault.css";
import { API } from "../../constant";
import {
  LogoutOutlined,
  SecurityScanOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import SuccessModal from "../../components/SuccessModal";

function HeaderDefault() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [sucessModalOpen, setSuccessModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [cookies] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const [user, setUser] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
    if (cookies.token && cookies.token !== "undefined") {
      axios
        .get(API + `/api/v1/users/detail`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          const userInfo = {
            name: response.data.info.name,
            avatar: response.data.info.avatar,
          };

          setUser(userInfo);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [location, cookies]);

  const toggleLoginModal = () => {
    setLoginOpen(!loginOpen);
    if (signUpOpen) setSignUpOpen(false);
    if (forgotPasswordOpen) setForgotPasswordOpen(false);
    if (sucessModalOpen) setSuccessModalOpen(false);
  };

  const toggleSignUpModal = () => {
    setSignUpOpen(!signUpOpen);
    if (loginOpen) setLoginOpen(false);
    if (forgotPasswordOpen) setForgotPasswordOpen(false);
    if (sucessModalOpen) setSuccessModalOpen(false);
  };

  const toggleForgotPasswordModal = () => {
    setForgotPasswordOpen(!forgotPasswordOpen);
    if (loginOpen) setLoginOpen(false);
    if (signUpOpen) setSignUpOpen(false);
    if (sucessModalOpen) setSuccessModalOpen(false);
  };

  const toggleSuccessModal = () => {
    setSuccessModalOpen(!sucessModalOpen);
    if (loginOpen) setLoginOpen(false);
    if (signUpOpen) setSignUpOpen(false);
    if (sucessModalOpen) setSuccessModalOpen(false);
  };

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    setLoginOpen(false);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const navLinkActive = (path) => {
    return activeLink === path ? "layout-default__menu--active" : "";
  };

  const deleteAllCookies = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleLogout = () => {
    deleteAllCookies();
    setUser(null);
    window.location.href = "/";
  };

  const menu = (
    <Menu className="user-dropdown">
      <Menu.Item key="0" className="user-dropdown-item">
        <Link to="/infouser">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">
              <UserOutlined className="dropdownItem-icon" />
            </div>
            <span>Trang cá nhân</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => {}} className="user-dropdown-item">
        <Link to="/infouser">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">
              <EditOutlined className="dropdownItem-icon" />
            </div>
            <span>Mentor của tôi</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {}} className="user-dropdown-item">
        <Link to="/infouser">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">
              <SecurityScanOutlined className="dropdownItem-icon" />
            </div>
            <span>Trợ giúp</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout} className="user-dropdown-item">
        <div className="dropdownItem-list">
          <div className="dropdownItem-logo">
            <LogoutOutlined className="dropdownItem-icon" />
          </div>
          <span>Đăng xuất</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <Row>
        <Header className="layout-default__header">
          <Col xl={4}>
            <div className="layout-default__logo">
              <div className="layout-default__logo--tt">
                <img src={logoNEU} alt="logo NEU" />
              </div>
              <div className="layout-default__logo--ncc">
                <img src={logoNCC} alt="logo NCC" />
              </div>
              <div className="layout-default__logo--noc">
                <img src={logoNOC} alt="logo NOC" />
              </div>
              <div className="layout-default__logo--ndm">
                <img src={logoNDM} alt="logo NDM" />
              </div>
            </div>
          </Col>
          <Col xl={14} className="layout-default__menu-container">
            <div className="layout-default__menu">
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={navLinkActive("/")}
                    onClick={() => handleLinkClick("/")}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={navLinkActive("/about")}
                    onClick={() => handleLinkClick("/about")}
                  >
                    Giới thiệu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/info"
                    className={navLinkActive("/info")}
                    onClick={() => handleLinkClick("/info")}
                  >
                    Thông tin
                  </NavLink>
                </li>
                <li>
                  <HashLink
                    to="/#footer"
                    className={navLinkActive("/#footer")}
                    onClick={() => handleLinkClick("/")}
                  >
                    Liên hệ
                  </HashLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={5}>
            <div className="layout-default__loginMenu">
              <div className="hamburger-button" onClick={toggleSidebar}>
                &#9776; {/* Biểu tượng hamburger */}
              </div>
              {user ? (
                <Dropdown
                  overlay={menu}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <div
                    className="user-info"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar src={user.avatar} />
                    <Link>{user.name}</Link>
                  </div>
                </Dropdown>
              ) : (
                <>
                  <Button type="text" onClick={toggleSignUpModal} ghost={true}>
                    Đăng kí
                  </Button>
                  <span>|</span>
                  <Button type="text" onClick={toggleLoginModal} ghost={true}>
                    Đăng nhập
                  </Button>
                </>
              )}
              <SignUp
                open={signUpOpen}
                toggleLoginModal={toggleLoginModal}
                toggleSuccessModal={toggleSuccessModal}
                onCancel={toggleSignUpModal}
              />
              <Login
                open={loginOpen}
                onLoginSuccess={handleLoginSuccess}
                toggleSignUpModal={toggleSignUpModal}
                toggleForgotPasswordModal={toggleForgotPasswordModal}
                onCancel={toggleLoginModal}
              />
              <ForgotPassword
                open={forgotPasswordOpen}
                onCancel={toggleForgotPasswordModal}
              />
              <SuccessModal
                open={sucessModalOpen}
                onCancel={toggleSuccessModal}
                toggleLoginModal={toggleLoginModal}
              />
            </div>
          </Col>
        </Header>
      </Row>
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleSidebar}
        visible={sidebarVisible}
        className="drawer"
      >
        <Menu className="drawer-menu" mode="inline">
          <Menu.Item key="0">
            <NavLink
              to="/"
              className={navLinkActive("/")}
              onClick={() => {
                handleLinkClick("/");
                toggleSidebar();
              }}
            >
              Trang chủ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink
              to="/about"
              className={navLinkActive("/about")}
              onClick={() => {
                handleLinkClick("/about");
                toggleSidebar();
              }}
            >
              Giới thiệu
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink
              to="/info"
              className={navLinkActive("/info")}
              onClick={() => {
                handleLinkClick("/info");
                toggleSidebar();
              }}
            >
              Thông tin
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <HashLink
              to="/#footer"
              className={navLinkActive("/#footer")}
              onClick={() => {
                handleLinkClick("/");
                toggleSidebar();
              }}
            >
              Liên hệ
            </HashLink>
          </Menu.Item>
          {user ? (
            <Menu.SubMenu
              key="user-menu"
              title={
                <div className="drawer-user-info">
                  <Avatar src={user.avatar} size={64} />
                  <div className="drawer-user-details">
                    <h3 style={{ fontSize: "12px", color: "#000" }}>
                      {user.name}
                    </h3>
                  </div>
                </div>
              }
            >
              <Menu.Item key="4">
                <NavLink
                  to="/infouser"
                  onClick={() => {
                    handleLinkClick("/info");
                    toggleSidebar();
                  }}
                >
                  <div className="dropdownItem-list">
                    <UserOutlined className="dropdownItem-icon" />
                    Trang cá nhân
                  </div>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/infouser">
                  <div className="dropdownItem-list">
                    <EditOutlined className="dropdownItem-icon" />
                    Mentor của tôi
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/infouser">
                  <div className="dropdownItem-list">
                    <SecurityScanOutlined className="dropdownItem-icon" />
                    Trợ giúp
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item key="7" onClick={handleLogout}>
                <div className="dropdownItem-list">
                  <LogoutOutlined className="dropdownItem-icon" />
                  Đăng xuất
                </div>
              </Menu.Item>
            </Menu.SubMenu>
          ) : (
            <>
              <Menu.Item className="button-sidebar-item" onClick={toggleSignUpModal} ghost={true} key="4">
                <Button type="text">
                  Đăng kí
                </Button>
              </Menu.Item>
              <Menu.Item className="button-sidebar-item" onClick={toggleLoginModal} ghost={true} key="5">
                <Button type="text" >
                  Đăng nhập
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </>
  );
}

export default HeaderDefault;

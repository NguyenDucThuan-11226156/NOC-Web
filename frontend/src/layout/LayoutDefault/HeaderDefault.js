import { Avatar, Button, Col, Dropdown, Menu, Row, Drawer, Skeleton } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  UserOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  FormOutlined,
  LoginOutlined
} from "@ant-design/icons";
import SuccessModal from "../../components/SuccessModal";

function HeaderDefault() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [sucessModalOpen, setSuccessModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [cookies, setCookie] = useCookies(["token", "avatar", "name"]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setCookie("avatar", response.data.info.avatar, { path: "/" });
          setCookie("name", response.data.info.name, { path: "/" });
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location, cookies, setCookie]);

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

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
                  <a
                    href="#footer"
                    className={navLinkActive("/#footer")}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("/#footer");
                      scrollToFooter();
                    }}
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={5}>
            <div className="layout-default__loginMenu">
              <div className="hamburger-button" onClick={toggleSidebar}>
                &#9776; {/* Biểu tượng hamburger */}
              </div>
              {loading ? (
                <div className="user-info">
                  <Skeleton.Avatar active size="large" />
                  <Skeleton.Input active style={{ width: 100 }} />
                </div>
              ) : user ? (
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
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/" onClick={toggleSidebar}>
              Trang chủ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <NavLink to="/about" onClick={toggleSidebar}>
              Giới thiệu
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined />}>
            <NavLink to="/info" onClick={toggleSidebar}>
              Thông tin
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<PhoneOutlined />}>
            <a href="#footer" onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
              scrollToFooter();
            }}>
              Liên hệ
            </a>
          </Menu.Item>
          {!user && !loading && (
            <>
              <Menu.Item key="5" icon={<FormOutlined />} onClick={toggleSignUpModal}>
                Đăng ký
              </Menu.Item>
              <Menu.Item key="6" icon={<LoginOutlined />} onClick={toggleLoginModal}>
                Đăng nhập
              </Menu.Item>
            </>
          )}
          {user && (
            <>
              <Menu.Item key="7">
                <div className="drawer-user-info">
                  <Avatar src={user.avatar} />
                  <span>{user.name}</span>
                </div>
              </Menu.Item>
              <Menu.Item key="8" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </>
  );
}

export default HeaderDefault;
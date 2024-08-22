import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ForgotPassword from "../../components/ForgotPW";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import axios from "axios"; // Import axios để gọi API
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
function HeaderDefault() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [cookies] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
    if (cookies.token && cookies.token !== "undefined") {
      // Gọi API để lấy thông tin user
      axios
        .get(API + `/api/v1/users/detail`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // Sử dụng token từ cookie
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
  };

  const toggleSignUpModal = () => {
    setSignUpOpen(!signUpOpen);
    if (loginOpen) setLoginOpen(false);
    if (forgotPasswordOpen) setForgotPasswordOpen(false);
  };

  const toggleForgotPasswordModal = () => {
    setForgotPasswordOpen(!forgotPasswordOpen);
    if (loginOpen) setLoginOpen(false);
    if (signUpOpen) setSignUpOpen(false);
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

  const handleMyMentor = () => {};

  const handleSupport = () => {};

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
      <Menu.Item
        key="1"
        onClick={handleMyMentor}
        className="user-dropdown-item"
      >
        <Link to="/infouser">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">
              <EditOutlined className="dropdownItem-icon" />
            </div>
            <span>Mentor của tôi</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSupport} className="user-dropdown-item">
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
          <Col xl={14}>
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
            </div>
          </Col>
        </Header>
      </Row>
    </>
  );
}

export default HeaderDefault;

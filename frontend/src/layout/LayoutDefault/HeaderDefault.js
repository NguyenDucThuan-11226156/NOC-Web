import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./LayoutDefault.css";
import { Row, Col, Button, Avatar, Dropdown, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
import ForgotPassword from "../../components/ForgotPW";
import { useCookies } from "react-cookie";

function HeaderDefault() {
  // handle pop up between modals
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
    if (cookies.token) {
      const userInfo = {
        name: cookies.name,
        avatar: cookies.avatar,
      };
      setUser(userInfo);
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

  //Logout
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("name");
    removeCookie("avatar");
    setUser(null);
    window.location.href = "/";
    // navigate("/");
  };

  const handleMyMentor = () => {};

  const handleSupport = () => {
    // navigate("/support");
  };

  const menu = (
    <Menu className="user-dropdown">
      <Menu.Item key="0" className="user-dropdown-item">
        <Link to="/profile">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">svg</div>
            <span>Trang cá nhân</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={handleMyMentor}
        className="user-dropdown-item"
      >
        <Link to="/profile">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">svg</div>
            <span>Mentor của tôi</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSupport} className="user-dropdown-item">
        <Link to="/profile">
          <div className="dropdownItem-list">
            <div className="dropdownItem-logo">svg</div>
            <span>Trợ giúp</span>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout} className="user-dropdown-item">
        <div className="dropdownItem-list">
          <div className="dropdownItem-logo">svg</div>
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
              <div className="layout-default__logo--tt">Logo TT</div>
              <div className="layout-default__logo--noc">Logo NOC</div>
              <div className="layout-default__logo--ndm">Logo NDM</div>
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
                    <Link to={"infoUser"}>{user.name}</Link>
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

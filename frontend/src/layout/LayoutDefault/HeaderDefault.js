import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./LayoutDefault.css";
import { Row, Col, Button, Avatar } from "antd";
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
  const [user, setUser] = useState(null); // Add user state

  const location = useLocation();

  useEffect(() => {
    // Update active link based on the current location path
    setActiveLink(location.pathname);
    if (cookies.token) {
      const userInfo = {
        name: cookies.name,
        avatar: cookies.avatar,
      };
      setUser(userInfo);
    }
  }, [location]);

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

  // Function to handle successful login
  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo); // Set the user information
    setLoginOpen(false); // Close the login modal
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const navLinkActive = (path) => {
    return activeLink === path ? "layout-default__menu--active" : "";
  };

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
                <div className="user-info">
                  <Avatar src={user.avatar} />
                  <Link to={"infoUser"}>{user.name}</Link>
                </div>
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
                onLoginSuccess={handleLoginSuccess} // Pass the login success handler
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

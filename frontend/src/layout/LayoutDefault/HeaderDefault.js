import { NavLink } from "react-router-dom";
import "./LayoutDefault.css";
import { Button, Row, Col } from "antd";
import { Header } from "antd/es/layout/layout";

function HeaderDefault() {
  const navLinkActive = (e) => {
    return e.isActive ? "layout-default__menu--active" : ""
  }
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
          <Col xl={15}>
            <div className="layout-default__menu">
              <ul>
                <li>
                  <NavLink to="/" className={navLinkActive}>Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={navLinkActive}>Giới thiệu</NavLink>
                </li>
                <li>
                  <NavLink to="/info" className={navLinkActive}>Thông tin</NavLink>
                </li>
                <li>
                  <NavLink to='' className={navLinkActive}>Liên hệ</NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={5}>
            <div className="layout-default__loginMenu">
              <Button>Đăng ký</Button>
              <span>|</span>
              <Button>Đăng nhập</Button>
            </div>
          </Col>
      </Header>
      </Row>
    </>
  );
}

export default HeaderDefault;

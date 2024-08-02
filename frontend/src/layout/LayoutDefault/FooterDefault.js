import { Col, Row } from "antd";
import { Footer } from "antd/es/layout/layout";

function FooterDefault() {
  return (
    <>
      <Footer className="layout-default__footer"  id="footer">
        <div className="layout-default__footerContainer">
          <Row>
            <Col xl={9}>
              <div className="layout-default__logoFooter">
                <div className="layout-default__logoFooter--tt">Logo TT</div>
                <div className="layout-default__logoFooter--noc">Logo NOC</div>
                <div className="layout-default__logoFooter--ndm">Logo NDM</div>
              </div>
              <div className="layout-default__center">
                <div className="layout-default__title">
                  <strong>
                    Trung tâm Tư vấn Hướng nghiệp và Việc làm, Trường Đại học
                    Kinh tế Quốc dân
                  </strong>
                </div>
                <div className="layout-default__office">
                  <strong>Văn phòng</strong>: Số 207 đường Giải Phóng, quận Hai
                  Bà Trưng, Hà Nội
                </div>
                <div className="layout-default__fanpage">
                  <strong>Fanpage</strong>: NEU Career Center - NOC
                </div>
                <div className="layout-default__email">
                  <strong>Email</strong>: /Cập nhật sau/
                </div>
                <div className="layout-default__hotline">
                  <strong>Hotline</strong> :
                  <span>
                    033.576.8289 (Ms. Lan)
                    <br />
                    081.606.1869 (Ms. Chi)
                    <br />
                    084.730.0704 (Ms. Linh)
                    <br />
                    091.142.9656 (Ms. Ly)
                  </span>
                </div>
              </div>
            </Col>
            <Col xl={4}>
              <div className="layout-default__about">
                <div className="layout-default__about--title"><strong>Về chúng tôi</strong></div>
                <div className="layout-default__about--list">
                  <ul>
                    <li>Trang chủ</li>
                    <li>Giới thiệu</li>
                    <li>Thông tin</li>
                    <li>Liên hệ</li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col xl={11}>
              <div className="layout-default__map">Map</div>
            </Col>
          </Row>
        </div>
        <div className="layout-default__copyright">
          Copyright © 2023 NEU Career Center.
        </div>
      </Footer>
    </>
  );
}

export default FooterDefault;

import { Col, Row } from "antd";
import { Footer } from "antd/es/layout/layout";
import logoNEU from "../../images/logo/Logo-Neu.svg";
import logoNCC from "../../images/logo/Logo-NCC.svg";
import logoNOC from "../../images/logo/NOC-black.svg";
import logoNDM from "../../images/logo/NOC-white.svg";
function FooterDefault() {
  return (
    <>
      <Footer className="layout-default__footer" id="footer">
        <div className="layout-default__footerContainer">
          <Row gutter={[20, 20]}>
            <Col xl={9} xs={24} className="layout-default__footerCol">
              <div className="layout-default__logoFooter">
                {/* <div className="layout-default__logoFooter--tt">Logo TT</div>
                <div className="layout-default__logoFooter--noc">Logo NOC</div>
                <div className="layout-default__logoFooter--ndm">Logo NDM</div> */}
                
                  <div className="layout-default__logoFooter--tt">
                    <img src={logoNEU} alt="logo NEU" />
                  </div>
                  <div className="layout-default__logoFooter--ncc">
                    <img src={logoNCC} alt="logo NCC" />
                  </div>
                  <div className="layout-default__logoFooter--noc">
                    <img src={logoNOC} alt="logo NOC" />
                  </div>
                  <div className="layout-default__logoFooter--ndm">
                    <img src={logoNDM} alt="logo NDM" />
                  </div>
                
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
                  <strong>Email</strong>: neudailymentoring.noc@gmail.com
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
            <Col xl={5} xs={24} className="layout-default__footerCol">
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
            <Col xl={10} xs={24}>
              <div className="layout-default__map" >
              <iframe width='100%' height='290px'  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8138138793643!2d105.8399242759693!3d21.000099188761034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac71752d8f79%3A0xd2ec575c01017afa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBLaW5oIFThur8gUXXhu5FjIETDom4gKE5FVSk!5e0!3m2!1svi!2s!4v1723275857627!5m2!1svi!2s" title="NEU address"></iframe>
              </div>
            </Col>
          </Row>
        </div>
        <div className="layout-default__copyright">
          NDM App v1.0.0 ||
          Copyright © 2024 NEU Career Center.
        </div>
      </Footer>
    </>
  );
}

export default FooterDefault;

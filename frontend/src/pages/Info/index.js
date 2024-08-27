import React from "react";
import Banner from "../../components/Banner";
import { Col, Row } from "antd";
import "./Info.css";

function Info() {
  return (
    <>
      <Banner />
      <div className="info-container">
        <section style={{ marginBottom: "100px" }} className="info-section">
          <h2 className="info-title">Sứ mệnh</h2>
          <Row align="center" justify="center" gutter={[20, 20]}>
            <Col xl={12} xs={24}>
              <div className="info-pic-container">
                <img src="" alt="info-pic" /> {/* Có thể thêm ảnh nếu muốn */}
              </div>
            </Col>
            <Col xl={12} xs={24}>
              <p className="info-description">
                Với sứ mệnh cốt lõi của Trung tâm Tư vấn Hướng nghiệp và Việc
                làm là hỗ trợ sinh viên định hướng nghề nghiệp, phát triển các
                kỹ năng cần thiết để thành công trong sự nghiệp và tìm kiếm cơ
                hội việc làm phù hợp, dự án NEU Daily Mentoring sẽ cung cấp một
                nền tảng để sinh viên được học hỏi, trao đổi và phát triển toàn
                diện. Mỗi cá nhân đều có những khả năng riêng và NEU Daily
                Mentoring sẽ là nơi giúp các bạn khám phá và phát huy tối đa
                những giá trị đó. Sứ mệnh của dự án là tạo ra một môi trường học
                tập và làm việc năng động, sáng tạo và bền vững, đồng hành với
                bạn trên con đường định hướng và phát triển bản thân. Dự án
                không chỉ trang bị cho bạn những kiến thức về ngành học, thị
                trường việc làm, rèn luyện những kĩ năng, phẩm chất cần thiết mà
                còn giúp bạn mở rộng mạng lưới mối quạn hệ để thành công trong
                cuộc sống. Thông qua quá trình hoạt động, dự án cũng đồng thời
                giúp các Mentor tìm ra các ứng viên sáng giá cho các vị trí nhân
                sự của doanh nghiệp liên quan.
              </p>
            </Col>
          </Row>
        </section>
        <section className="network-section">
          <h2 className="info-title">Mạng lưới</h2>
          <Row align="center" justify="center" gutter={[20, 20]}>
            <Col xl={12} xs={24}>
              <p className="info-description">
                Dự án NEU Daily Mentoring kết nối Mentee - những sinh viên có
                mong muốn học hỏi, trau dồi với đội ngũ Mentor bao gồm các cựu
                sinh viên, giảng viên,... giàu kinh nghiệm, có kiến thức chuyên
                sâu ở nhiều lĩnh vực, tạo điều kiện thuận lợi để các bạn được tư
                vấn, hướng dẫn và hỗ trợ trong suốt quá trình học tập và làm
                việc.
              </p>
            </Col>
            <Col xl={12} xs={24}>
              <div className="info-pic-container">
                <img src="" alt="info-pic" /> {/* Có thể thêm ảnh nếu muốn */}
              </div> 
            </Col>
          </Row>
        </section>
      </div>
    </>
  );
}

export default Info;

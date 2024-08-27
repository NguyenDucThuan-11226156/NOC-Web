import Banner from "../../components/Banner";
import { Col, Row } from "antd";
import "./About.css";
function About() {
  return (
    <>
      <Banner />
      <div className="info-container">
        <section className="about-section">
          <h2 className="about-title">Giới thiệu</h2>
          <Row align="center" justify='center' gutter={[20, 20]}>
            <Col span={12}>
                <div className="about-pic-container">
                <img src="" alt="about-pic" /> {/* Có thể thêm ảnh nếu muốn */}
                </div>
            </Col>
            <Col span={12}>
              <p className="about-description">
                NEU Daily Mentoring là dự án thường nhật được tổ chức bởi Trung
                tâm Tư vấn Hướng nghiệp và Việc làm Trường Đại học Kinh tế Quốc
                dân - NEU Career Center, kết hợp với CLB Định hướng Sinh viên
                Trường Đại học Kinh tế Quốc dân - NEU Orientation Club. Mỗi sinh
                viên đều có những mục tiêu và mong muốn khác nhau, vì vậy, dự án
                NEU Daily Mentoring ra đời với mục đích xây dựng một chương
                trình mentoring cá nhân hóa, giúp mỗi sinh viên tìm ra con đường
                phát triển phù hợp nhất bên cạnh sự hỗ trợ từ những mentor giàu
                kinh nghiệm.
              </p>
            </Col>
          </Row>
        </section>
      </div>
    </>
  );
}

export default About;

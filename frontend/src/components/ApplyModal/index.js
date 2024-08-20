import { Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./ApplyModal.css";
import { useCookies } from "react-cookie";
import { API } from "../../constant";
import axios from "axios";
import { useEffect } from "react";
const { TextArea } = Input;
const { Option } = Select;

function ApplyModal({ open, onCancel, mentorId }) {
  const [form] = Form.useForm();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const [cv, setCv] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get(API + `/api/v1/users/detailPure`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        const { _id, name, email, domain, studentId, number } =
          response.data.info;
        setName(name);
        setEmail(email);
        setStudentId(studentId);
        setDomain(domain);
        setPhoneNumber(number);
        setId(_id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchAPI();
  }, []);

  const onFinish = (values) => {
    setIsSubmitting(true); // Set loading state to true
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("field", values.field);
    formData.append("fullName", values.fullName);
    formData.append("introduction", values.introduction);
    formData.append("issueDescription", values.issueDescription);
    formData.append("domain", values.domain);
    formData.append("phone", values.phone);
    formData.append("school", values.school);
    formData.append("studentID", values.studentID);
    formData.append("_id", id);
    console.log("mentorId", mentorId);
    if (cv) {
      formData.append("cv", cv.originFileObj); // Append the file to FormData
    }
    axios
      .post(API + `/api/v1/users/applyNow/${mentorId}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Server response:", response.data);
        setIsSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {
        setIsSubmitting(false); // Set loading state to false after response
      });
  };

  const handleChangeCv = (info) => {
    setCv(info.fileList[0]);
  };

  const handleSuccessModalOk = () => {
    setIsSuccessModalVisible(false);
    onCancel();
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        className="apply-form"
        centered
        mask={false}
      >
        <h2 className="apply-form-title">Đơn đăng ký trở thành Mentee</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            fullName: name,
            studentID: studentId,
            domain: domain,
            email: email,
            phone: `0${phoneNumber}`,
          }}
        >
          <Row gutter={[25, 10]} justify={"space-around"}>
            <Col>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                className="apply-form-item"
              >
                <Input placeholder="Họ và tên" disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="school"
                label="Trường"
                rules={[
                  { required: true, message: "Vui lòng nhập tên trường!" },
                ]}
                className="apply-form-item"
              >
                <Input placeholder="Trường" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 10]} justify={"space-around"}>
            <Col>
              <Form.Item
                name="domain"
                label="Lớp chuyên ngành"
                className="apply-form-item"
              >
                <Input placeholder="Lớp chuyên ngành" disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="studentID"
                label="Mã sinh viên"
                className="apply-form-item"
              >
                <Input placeholder="Mã sinh viên" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 10]} justify={"space-around"}>
            <Col>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                className="apply-form-item"
              >
                <Input placeholder="Số điện thoại" disabled />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="email" label="Email" className="apply-form-item">
                <Input placeholder="Email" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="introduction"
            label="Giới thiệu về bản thân"
            rules={[
              { required: true, message: "Vui lòng giới thiệu về bản thân!" },
            ]}
            className="apply-form-introduction"
          >
            <TextArea placeholder="Ưu điểm, nhược điểm..." />
          </Form.Item>
          <Form.Item
            name="field"
            label="Vấn đề lĩnh vực bạn muốn nhận được tư vấn từ mentor"
            rules={[
              { required: true, message: "Vui lòng chọn vấn đề lĩnh vực!" },
            ]}
            className="apply-form-field"
          >
            <Select placeholder="Chọn lĩnh vực">
              <Option value="Hướng nghiệp">Hướng nghiệp</Option>
              <Option value="Kĩ năng mềm">Kĩ năng mềm</Option>
              <Option value="Công tác Đoàn đội / CLB">
                Công tác Đoàn đội / CLB
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="issueDescription"
            label="Bạn có thể mô tả vấn đề của bạn để phía Ban tổ chức/Mentor nắm rõ hơn không?"
            className="apply-form-issueDescription"
          >
            <TextArea placeholder="Băn khoăn, vấn đề gặp phải..." />
          </Form.Item>
          <Form.Item
            name="cv"
            label="Tải CV của bạn ở đây"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            className="apply-form-cv"
            rules={[{ required: true, message: "Vui lòng tải lên file CV!" }]} // Add this rule
          >
            <Upload
              name="cv"
              listType="text"
              accept="application/pdf"
              onChange={handleChangeCv}
              beforeUpload={() => false} // Prevent auto-upload to make form submission handle the file
            >
              <Button icon={<UploadOutlined />}>Định dạng PDF</Button>
            </Upload>
          </Form.Item>

          <p style={{ marginTop: 16 }}>
            Sau khi đăng ký, bạn sẽ nhận được thông báo về tình trạng đơn của
            bạn qua email trong vòng 48 giờ để tới thời điểm đăng ký. Nếu đơn
            đăng ký thành công, chúng tôi sẽ gửi lịch trình mentoring của Mentor
            để bạn có thể xác nhận tham gia.
          </p>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting} // Loading state applied here
              className="apply-form-btn"
            >
              Xác nhận đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isSuccessModalVisible}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
        centered
        footer={null}
        className="applyModal-success"
      >
        <h2>Apply thành công</h2>
        <p>Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất !</p>
      </Modal>
    </>
  );
}

export default ApplyModal;

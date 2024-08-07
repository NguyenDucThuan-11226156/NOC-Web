import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

function ApplyModal({ open, onCancel }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="apply-form"
      centered
    >
      <h2>Đơn đăng ký trở thành Mentee</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="school"
          label="Trường"
          rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
        >
          <Input placeholder="Trường" />
        </Form.Item>
        <Form.Item
          name="major"
          label="Lớp chuyên ngành"
          rules={[{ required: true, message: 'Vui lòng nhập lớp chuyên ngành!' }]}
        >
          <Input placeholder="Lớp chuyên ngành" />
        </Form.Item>
        <Form.Item
          name="studentID"
          label="Mã sinh viên"
          rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
        >
          <Input placeholder="Mã sinh viên" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="introduction"
          label="Giới thiệu về bản thân"
          rules={[{ required: true, message: 'Vui lòng giới thiệu về bản thân!' }]}
        >
          <TextArea placeholder="Ưu điểm, nhược điểm..." />
        </Form.Item>
        <Form.Item
          name="field"
          label="Vấn đề lĩnh vực bạn muốn nhận được tư vấn từ mentor"
          rules={[{ required: true, message: 'Vui lòng chọn vấn đề lĩnh vực!' }]}
        >
          <Select placeholder="Chọn lĩnh vực">
            <Option value="field1">Hướng nghiệp</Option>
            <Option value="field2">Kĩ năng mềm</Option>
            <Option value="field3">Công tác Đoàn đội / CLB</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="issueDescription"
          label="Bạn có thể mô tả vấn đề của bạn để phía Ban tổ chức/Mentor nắm rõ hơn không?"
        >
          <TextArea placeholder="Băn khoăn, vấn đề gặp phải..." />
        </Form.Item>
        <Form.Item
          name="cv"
          label="Tải CV của bạn ở đây (nếu có)"
          valuePropName="fileList"
          getValueFromEvent={e => e.fileList}
        >
          <Upload name="cv" action="/upload.do" listType="text" accept='application/pdf'>
            <Button icon={<UploadOutlined />}>Đính dạng PDF</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận đăng ký
          </Button>
        </Form.Item>
      </Form>
      <p style={{ marginTop: 16 }}>
        Sau khi đăng ký, bạn sẽ nhận được thông báo về tình trạng đơn của bạn qua email trong vòng 48 giờ để tới thời điểm đăng ký. Nếu đơn đăng ký thành công, chúng tôi sẽ gửi lịch trình mentoring của Mentor để bạn có thể xác nhận tham gia.
      </p>
    </Modal>
  );
}

export default ApplyModal;

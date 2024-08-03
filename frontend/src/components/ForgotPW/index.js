import { Button, Form, Input, Modal } from "antd";
import "./ForgotPW.css";

function ForgotPassword({ open, onCancel }) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Quên mật khẩu"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className="modal-forgotPW"
    >
      <Form
        name="forgotPassword"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="form-forgotPW"
      >
        <p>Vui lòng nhập email để lấy mã xác nhận</p>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mã OTP" name="OTP" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="form-forgotPW-check">
            Bạn chưa nhận được mã?{" "}
            <Button className="form-forgotPW-checkBtn" type="link">
              Gửi lại
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 19,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="form-forgotPW-btn">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ForgotPassword;

import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import axios from "axios";
import ResetPW from "../ResetPW";  // Import ResetPW component
import "./ForgotPW.css";

function ForgotPassword({ open, onCancel }) {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

  const handleForgotPassword = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/password/forgot", {
        email: values.email,
      });
      notification.success({
        message: 'Gửi mã OTP thành công!',
        description: 'Vui lòng kiểm tra email của bạn.',
      });
      setEmail(values.email);
      setIsOtpModalVisible(true);
    } catch (error) {
      notification.error({
        message: 'Gửi mã OTP thất bại!',
        description: error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      });
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/password/otp", {
        email: email,
        otp: values.otp,
      });
      setToken(res.data.token);
      setIsOtpModalVisible(false);
      setIsResetPasswordModalVisible(true);
    } catch (error) {
      notification.error({
        message: 'Xác nhận OTP thất bại!',
        description: error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      });
    }
  };

  const handleResetPasswordSuccess = () => {
    setIsResetPasswordModalVisible(false);
    onCancel();
  };

  return (
    <>
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
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={handleForgotPassword}
          onFinishFailed={() => notification.error({ message: 'Vui lòng kiểm tra lại thông tin' })}
          autoComplete="off"
          layout="vertical"
          className="form-forgotPW"
        >
          <p>Vui lòng nhập email để lấy mã xác nhận</p>
          <Form.Item
            label="Địa chỉ email khôi phục"
            name="email"
            className="form-forgotPW-email"
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input placeholder="abcxyz@gmail.com"/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" className="form-forgotPW-btn">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Nhập mã OTP"
        open={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        footer={null}
        centered
      >
        <Form
          name="otpVerification"
          onFinish={handleVerifyOtp}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Mã OTP"
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <Input placeholder="Nhập mã OTP"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận OTP
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ResetPW
        isVisible={isResetPasswordModalVisible}
        onCancel={() => setIsResetPasswordModalVisible(false)}
        token={token}
        onSuccess={handleResetPasswordSuccess}
      />
    </>
  );
}

export default ForgotPassword;

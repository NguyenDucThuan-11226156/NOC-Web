import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import "./ResetPW.css";

function ResetPW({ isVisible, onCancel, token, onSuccess }) {
  const handleResetPassword = async (values) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/password/reset",
        {
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({
        message: "Đổi mật khẩu thành công!",
      });
      onSuccess();
    } catch (error) {
      notification.error({
        message: "Đổi mật khẩu thất bại!",
        description:
          error.response?.data?.message ||
          "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
    }
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please input your password!"));
    }
    if (value.length < 8 || value.length > 20) {
      return Promise.reject(
        new Error("Password must be between 8 and 20 characters!")
      );
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter!")
      );
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter!")
      );
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one number!")
      );
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character!")
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <Modal
      title="Đổi mật khẩu"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
      className="resetPW-modal"
    >
      <p className="resetPW-subtitle-1">Tạo mật khẩu mạnh</p>
      <p className="resetPW-subtitle-2">
        Tạo mật khẩu mới và mạnh mà bạn không dùng cho trang web khác{" "}
      </p>
      <Form
        name="resetPassword"
        onFinish={handleResetPassword}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Tạo mật khẩu mới"
          name="password"
          rules={[
            { required: true, validator: validatePassword },
          ]}
          className="resetPW-password"
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            className="resetPW-input"
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            validateConfirmPassword,
          ]}
          className="resetPW-confirmPassword"
        >
          <Input.Password
            placeholder="Xác nhận mật khẩu"
            className="resetPW-input"
          />
        </Form.Item>

        <Form.Item className="resetPW-request">
          <ul>
            <li>Mật khẩu từ 8 đến 20 kí tự</li>
            <li>Bao gồm chữ số, chữ viết hoa, chữ viết thường</li>
            <li>Bao gồm ít nhất một kí tự đặc biệt @!#$%</li>
          </ul>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="resetPW-btn">
            Lưu mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ResetPW;

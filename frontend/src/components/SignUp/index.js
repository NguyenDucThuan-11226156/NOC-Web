import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { post } from "../../utils/request";
import './SignUp.css';
import SuccessModal from "../SuccessModal"; // Import the SuccessModal component

function SignUp({ open, toggleLoginModal, onCancel, toggleSuccessModal }) {
  const [loading, setLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const onFinish = async (values) => {
    setLoading(true); // Set loading state to true when the form is submitted
    try {
      const response = await post("/api/v1/users/register", {
        email: values.email,
        password: values.password,
      });

      if (response && response.code === 200) {
        // Successful registration
        setLoading(false); // Stop loading when the request is finished
        toggleSuccessModal(); // Show success modal
      } else if (response && response.code === 400 && response.message === "Email đã tồn tại!") {
        // Email already exists
        setLoading(false);
        message.error("Email đã tồn tại. Đăng ký không thành công!"); // Display error message if email exists
      } else {
        // Other errors
        setLoading(false);
        message.error("Đăng ký thất bại. Vui lòng thử lại!"); // Display generic error message if registration fails
      }
    } catch (error) {
      setLoading(false);
      message.error("Đăng ký thất bại. Vui lòng thử lại!"); // Display error message if registration fails
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      title="Đăng kí tài khoản"
      open={open}
      onCancel={onCancel}
      footer={null}
      className="modal-signUp"
      centered
    >
      <Form
        name="register"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          xl: 24,
          xs: 24
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="form-signUp"
      >
        <Form.Item
          label="Địa chỉ email"
          name="email"
          className="form-signUp-item"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Nhập email"/>
        </Form.Item>

        <Form.Item
          label="Mật Khẩu"
          name="password"
          className="form-signUp-item"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu"/>
        </Form.Item>

        <Form.Item
          label="Xác nhận lại mật khẩu"
          name="confirmPassword"
          className="form-signUp-item"
          labelCol={{
            span: 12,
          }}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu"/>
        </Form.Item>

        <Form.Item className="form-signUp-request">
          <ul>
            <li>Mật khẩu từ 8 đến 20 kí tự</li>
            <li>Bao gồm chữ số, chữ viết hoa, chữ viết thường</li>
            <li>Bao gồm ít nhất một kí tự đặc biệt @!#$%</li>
          </ul>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 17,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading} // Set the loading state for the button
            className="form-signUp-button"
          >
            Đăng kí
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="form-signUp-goLogin">
            Đã có tài khoản? Quý khách muốn{" "}
            <Button type="link" onClick={toggleLoginModal} className="form-goLogin">
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SignUp;
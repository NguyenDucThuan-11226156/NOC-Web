import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import "./Login.css";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { API } from "../../constant";
function Login({
  open,
  toggleSignUpModal,
  toggleForgotPasswordModal,
  onCancel,
  onLoginSuccess,
}) {
  const [cookies, setCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      setIsAuthenticated(true);
    }
  }, [cookies, onLoginSuccess]);

  const fetchAvatarDefault = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/admin/getSettings`);
      const avatarDefault = response.data.data[0].avatarDefault;
      return avatarDefault;
    } catch (error) {
      console.error("Failed to fetch avatarDefault:", error);
      return null;
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    let userInfo = {};
    try {
      const res = await axios.post(`${API}/api/v1/users/login`, {
        email: values.username,
        password: values.password,
      });

      const avatarDefault = await fetchAvatarDefault();

      setCookie("token", res.data.token);
      setCookie("name", res.data.user.name);
      setCookie("avatar", avatarDefault || "default_avatar_url_here");

      userInfo = {
        name: res.data.user.name,
        avatar: avatarDefault || "default_avatar_url_here",
      };

      setIsAuthenticated(true);
      onLoginSuccess(userInfo);

      notification.success({
        message: res.data.message,
        description: "",
      });
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description:
          error.response?.data?.message ||
          "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Đăng nhập thất bại",
      description: "Vui lòng kiểm tra lại thông tin đăng nhập của bạn.",
    });
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className="form-login"
      centered
    >
      <h2 className="login-mainTitle">NEU DAILY MENTORING</h2>
      <h2 className="login-subTitle">Đăng nhập</h2>
      <Form
        name="login"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 22,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="username"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input className="form-input" placeholder="abcxyz@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            className="form-input"
            placeholder="Nhập tối thiểu 8 kí tự"
          />
        </Form.Item>

        <div className="form-grpRememberForgot">
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox className="form-remember">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <div>
              <Button
                type="link"
                onClick={toggleForgotPasswordModal}
                className="form-forgotPassword"
              >
                Quên mật khẩu?
              </Button>
            </div>
          </Form.Item>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="form-loginButton"
            loading={isLoading}
          >
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="form-goRegister">
            Quý khách chưa có tài khoản? Quý khách muốn{" "}
            <Button
              type="link"
              onClick={toggleSignUpModal}
              className="form-goRegister-btn"
            >
              Đăng ký?
            </Button>{" "}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Login;

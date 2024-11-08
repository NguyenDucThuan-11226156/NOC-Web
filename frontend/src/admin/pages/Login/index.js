import React from "react";
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import "./LoginAdmin.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { post } from "../../../utils/request";
import { useCookies } from "react-cookie";
const NormalLoginForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const onFinish = async (values) => {
    try {
      const res = await post("/api/v1/admin/login", {
        email: values.username,
        password: values.password,
      });
      if (res.token) {
        setCookie("tokenAdmin", res.token);
        notification.success({
          message: res.message,
          description: "",
        });
        window.location.href = "/admin";
      } else {
        notification.error({
          message: "Đăng nhập thất bại",
        });
      }
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description:
          error.response?.data?.message ||
          "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <>
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h1 className="login-title">Login</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="login-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="login-input"
            />
          </Form.Item>
          <Form.Item className="remember-container">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#fff" }}>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item className="login-btn-container">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div className="register-container">
              Or <br />{" "}
              <a className="register-link" href="">
                Register now!
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default NormalLoginForm;

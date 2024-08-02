import { Button, Checkbox, Form, Input, Modal } from "antd";
import "./Login.css";

function Login({
  open,
  toggleSignUpModal,
  toggleForgotPasswordModal,
  onCancel,
  onLoginSuccess,
}) {
  const onFinish = (values) => {
    console.log("Success:", values);
    handleLogin(); // Call handleLogin to simulate successful login
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = () => {
    // Assume login is successful and you get user data
    const userInfo = {
      name: "Nam Nguyen",
      avatar:
        "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/394293600_1122885558682437_641231820292856308_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEYt56-h2imKpVOkMMGEQ7PBzVn1Z34OIEHNWfVnfg4gRj3xIt8QEwhRE3zwVCTbR_qT7kzVnjBDdKFRUqD8HB0&_nc_ohc=gbA-Xu774aUQ7kNvgHTQPgh&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCtKpHSRqtP4ZRE5gorltREd5jp1uEcSfUCjPV9Q6yL4Q&oe=66B275C3",
    };
    onLoginSuccess(userInfo);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className="form-login"
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
          className="form-item"
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          className="form-item"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password className="form-input" />
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
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="form-loginButton">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="form-goRegister">
            Quý khách chưa có tài khoản? Quý khách muốn{" "}
            <Button
              className="form-goRegister-btn"
              type="link"
              onClick={toggleSignUpModal}
            >
              Đăng ký?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Login;

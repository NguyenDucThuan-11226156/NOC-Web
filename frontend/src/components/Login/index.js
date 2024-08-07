import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import "./Login.css";
import { post } from "../../utils/request";
import { useCookies } from "react-cookie";
function Login({
  open,
  toggleSignUpModal,
  toggleForgotPasswordModal,
  onCancel,
  onLoginSuccess,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const onFinish = async (values) => {
    // Assume login is successful and you get user data
    let userInfo = {};
      const res = await post("/api/v1/users/login", {
        email: values.username,
        password: values.password,
      });
      setCookie("token", res.token);
      userInfo = {
        name: res.user.name,
        avatar:
          "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/394293600_1122885558682437_641231820292856308_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEYt56-h2imKpVOkMMGEQ7PBzVn1Z34OIEHNWfVnfg4gRj3xIt8QEwhRE3zwVCTbR_qT7kzVnjBDdKFRUqD8HB0&_nc_ohc=gbA-Xu774aUQ7kNvgHTQPgh&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCtKpHSRqtP4ZRE5gorltREd5jp1uEcSfUCjPV9Q6yL4Q&oe=66B275C3",
      };
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Đăng nhập thất bại',
      description: 'Vui lòng kiểm tra lại thông tin đăng nhập của bạn.',
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
          span: 23,
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

import { Button, Checkbox, Form, Input, Modal } from "antd";

function Login({ open, toggleSignUpModal, toggleForgotPasswordModal, onCancel, onLoginSuccess }) {
  const onFinish = (values) => {
    console.log('Success:', values);
    handleLogin(); // Call handleLogin to simulate successful login
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogin = () => {
    // Assume login is successful and you get user data
    const userInfo = { name: 'Nam Nguyen', avatar: 'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/394293600_1122885558682437_641231820292856308_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEYt56-h2imKpVOkMMGEQ7PBzVn1Z34OIEHNWfVnfg4gRj3xIt8QEwhRE3zwVCTbR_qT7kzVnjBDdKFRUqD8HB0&_nc_ohc=gbA-Xu774aUQ7kNvgHTQPgh&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCtKpHSRqtP4ZRE5gorltREd5jp1uEcSfUCjPV9Q6yL4Q&oe=66B275C3' };
    onLoginSuccess(userInfo);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <h2>NEU DAILY MENTORING</h2>
      <h2>Đăng nhập</h2>
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <div>
            <Button type="link" onClick={toggleForgotPasswordModal}>
              Forgot password?
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <div>Bạn chưa có tài khoản? <Button type="link" onClick={toggleSignUpModal}>Đăng kí</Button> ngay thôi</div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Login;

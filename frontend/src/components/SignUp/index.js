import { Button, Form, Input, Modal } from "antd";
import { post } from "../../utils/request";

function SignUp({ open, toggleLoginModal, onCancel }) {
  const onFinish = async (values) => {
    console.log("Success:", values);
    await post("/api/v1/users/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      // receive message then display to the screen
      // save token into the cookies
      const token = response.token;
      // setcookie with expire 1d
      // after that, all apis need token to HTTP.
    });
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
    >
      <Form
        name="register"
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
          label="Email"
          name="email"
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật Khẩu"
          name="password"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận lại mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" >
            Đăng kí
          </Button>
        </Form.Item>

        <Form.Item>
          <div>
            Đã có tài khoản?{" "}
            <Button type="link" onClick={toggleLoginModal}>
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SignUp;

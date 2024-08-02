import { Button, Form, Input, Modal } from "antd";
import "./ForgotPW.css";
import FormItem from "antd/es/form/FormItem";

function ForgotPassword({ open, onCancel }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      <p>Vui lòng nhập email để lấy mã xác nhận</p>
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
        <Form.Item
          label="Địa chỉ email khôi phục"
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

        <Form.Item label="Mã OTP" name="OTP" rules={[]}>
          <Input />
        </Form.Item>
        <FormItem>
          <div className="form-forgotPW-check">
            Bạn chưa nhận được mã?{" "}
            <Button className="form-forgotPW-checkBtn" type="link">
              Gửi lại
            </Button>
          </div>
        </FormItem>
        <FormItem
          wrapperCol={{
            offset: 19,
            span: 16,
          }}
        >
          <Button className="form-forgotPW-btn" type="primary" htmlType="submit">
            Gửi
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default ForgotPassword;

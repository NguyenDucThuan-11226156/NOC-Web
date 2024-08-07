import { Button, Form, Input, Modal, notification } from "antd";
// import { useState } from "react";
import axios from "axios";

function ResetPW({ isVisible, onCancel, token, onSuccess }) {
  const handleResetPassword = async (values) => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/password/reset", {
        password: values.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notification.success({
        message: 'Đổi mật khẩu thành công!',
      });
      onSuccess();
    } catch (error) {
      notification.error({
        message: 'Đổi mật khẩu thất bại!',
        description: error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      });
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        name="resetPassword"
        onFinish={handleResetPassword}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới"/>
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ResetPW;

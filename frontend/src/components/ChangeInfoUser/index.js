import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import React from "react";
import "./ChangeInfoUser.css";

const ChangeInfoUser = ({ visible, onClose, userInfo }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("/api/v1/users/update", values); // Adjust the endpoint according to your backend
      // Handle success, maybe show a success notification or message
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update user info:", error);
      // Handle error, show notification or message
    }
  };

  return (
    <Modal
      visible={visible}
      title="Chỉnh sửa thông tin cá nhân"
      onCancel={onClose}
      className="changeInfo"
      footer={[
        <Button key="cancel" onClick={onClose} className="changeInfo-btn">
          Cancel
        </Button>,
        <Button key="save" onClick={handleSave} className="changeInfo-btn">
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="horizontal"
        labelAlign="left"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          name: userInfo.name,
          school: userInfo.school,
          studentId: userInfo.studentId,
          email: userInfo.email,
          number: userInfo.number,
        }}
      >
        <Form.Item
          label="Họ và tên"
          className="changeInfo-item"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lớp học phần"
          className="changeInfo-item"
          name="school"
          rules={[{ required: true, message: "Vui lòng nhập lớp học phần!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã sinh viên"
          className="changeInfo-item"
          name="studentId"
          rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          className="changeInfo-item"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          className="changeInfo-item"
          name="number"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeInfoUser;

import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

const ChangeInfoUser = ({ visible, onClose, userInfo }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await axios.post('/api/v1/users/update', values); // Adjust the endpoint according to your backend
      // Handle success, maybe show a success notification or message
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Failed to update user info:', error);
      // Handle error, show notification or message
    }
  };

  return (
    <Modal
      visible={visible}
      title="Chỉnh sửa thông tin cá nhân"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
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
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lớp học phần"
          name="school"
          rules={[{ required: true, message: 'Vui lòng nhập lớp học phần!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã sinh viên"
          name="studentId"
          rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="number"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeInfoUser;

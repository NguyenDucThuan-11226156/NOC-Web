import { Button, Form, Input, Modal, Upload, notification } from "antd";
import axios from "axios";
import React from "react";
import { API } from "../../constant";
import { UploadOutlined } from "@ant-design/icons";
import "./ChangeInfoUser.css";

const ChangeInfoUser = ({ visible, onClose, userInfo }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append form values to FormData
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // Append avatar file to FormData
      if (values.avatar) {
        formData.append("avatar", values.avatar[0].originFileObj);
      }

      // Send POST request to backend
      await axios.post(API + `/api/v1/users/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notification.success({
        message: "Success",
        description: "Thông tin cá nhân đã được cập nhật thành công!",
      });

      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update user info:", error);
      notification.error({
        message: "Error",
        description: "Cập nhật thông tin không thành công. Vui lòng thử lại.",
      });
    }
  };

  // Check if the uploaded file is an image
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      notification.error({
        message: "Error",
        description: "Bạn chỉ có thể tải lên các file định dạng ảnh!",
      });
    }
    return isImage || Upload.LIST_IGNORE;
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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
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
        <Form.Item
          label="Avatar"
          className="changeInfo-item"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
          rules={[{ required: true, message: "Vui lòng tải lên avatar!" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Tải lên avatar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeInfoUser;

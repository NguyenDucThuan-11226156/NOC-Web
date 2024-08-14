import { Button, Form, Input, Modal, Upload, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../../constant";
import { UploadOutlined } from "@ant-design/icons";
import "./ChangeInfoUser.css";
import { useCookies } from "react-cookie";
const ChangeInfoUser = ({ visible, onClose, userInfo }) => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"], {
    doNotParse: true,
  });
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      console.log(values);
      formData.append("name", values.name);
      formData.append("school", values.school);
      formData.append("studentId", values.studentId);
      formData.append("email", values.email);
      formData.append("number", values.number);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      // Send POST request to backend
      await axios
        .post(API + `/api/v1/users/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            notification.success({
              message: "Success",
              description: "Thông tin cá nhân đã được cập nhật thành công!",
            });
            window.location.href = "/infouser";
          } else {
            notification.error({
              message: "Error",
              description:
                "Cập nhật thông tin không thành công. Vui lòng thử lại.",
            });
          }
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
  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
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
        encType="multipart/form-data"
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
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            icon={<UploadOutlined />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeInfoUser;

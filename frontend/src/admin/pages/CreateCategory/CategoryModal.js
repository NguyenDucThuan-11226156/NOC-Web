import React, { useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import axios from "axios";
import { API } from "../../../constant";
import { useCookies } from "react-cookie";
const CategoryModal = ({ visible, onClose, categoryType, fetchCategories }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [cookies] = useCookies(["token"]); // Get the token from cookies
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API}/api/v1/admin/createCategory`,
        {
          [categoryType]: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.tokenAdmin}`, // Add token to the header
          },
        }
      );
      message.success(response.data.message);
      form.resetFields();
      fetchCategories(); // Fetch the updated list after creation
      onClose();
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title={`Create ${
        categoryType.charAt(0).toUpperCase() + categoryType.slice(1)
      }`}
      onCancel={onClose}
      className="categories-modal"
      footer={[
        <Button
          className="categories-cancel-btn"
          key="cancel"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          className="categories-modal-create-btn"
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: `Please input the ${categoryType} description!`,
            },
          ]}
        >
          <Input
            className="categories-modal-input"
            placeholder={`Enter ${categoryType} description`}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;

import React from "react";
import { Modal, Form, Input } from "antd";

const EditCategoryModal = ({ isVisible, onCancel, onOk, form, categoryName }) => {
  return (
    <Modal
      title={`Edit ${categoryName}`}
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name={categoryName.toLowerCase()}
          label={`${categoryName} Description`}
          rules={[{ required: true, message: `Please input the ${categoryName.toLowerCase()} description!` }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;

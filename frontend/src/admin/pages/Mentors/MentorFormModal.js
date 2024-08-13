import React from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";

const MentorFormModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      console.log(values);
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      title="Add Mentor"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        enctype="multipart/form-data"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the mentor's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
          rules={[{ required: true, message: "Please enter the avatar URL!" }]}
        >
          <Input type="file" accept="image/jpeg, image/png" />
        </Form.Item>
        {/* <Form.Item
          name="menteeCount"
          label="Mentee Count"
          rules={[
            { required: true, message: "Please enter the mentee count!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item> */}
        <Form.Item
          name="introduction1"
          label="Introduction 1"
          rules={[
            { required: true, message: "Please enter the first introduction!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="introduction2"
          label="Introduction 2"
          rules={[
            {
              required: true,
              message: "Please enter the second introduction!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="organization"
          label="Organization"
          rules={[
            { required: true, message: "Please enter the organization!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="specialization"
          label="Specialization"
          rules={[
            { required: true, message: "Please enter the specialization!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="education"
          label="Education"
          rules={[{ required: true, message: "Please enter the education!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="industry"
          label="Industry"
          rules={[{ required: true, message: "Please enter the industry!" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="rate"
          label="Rate"
          rules={[{ required: true, message: "Please enter the rate!" }]}
        >
          <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
        </Form.Item> */}
        {/* <Form.Item
          name="numberRate"
          label="Number of Rates"
          rules={[
            { required: true, message: "Please enter the number of rates!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item> */}
        {/* <Form.Item name="keyword" label="Keyword">
          <Input />
        </Form.Item>
        <Form.Item name="other" label="Other">
          <Input />
        </Form.Item> */}
        <Form.Item name="companyLogo" label="Company Logo">
          <Input type="file" accept="image/jpeg, image/png" />
        </Form.Item>
        <Form.Item name="field" label="Field">
          <Input />
        </Form.Item>
        <Form.Item name="experience" label="Experience">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Mentor
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MentorFormModal;

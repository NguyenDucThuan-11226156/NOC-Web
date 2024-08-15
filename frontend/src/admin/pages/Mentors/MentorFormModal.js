import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Row,
  Col,
} from "antd";
import "./MentorPage.css";
import { useState } from "react";
const MentorFormModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData(); // Corrected capitalization
      formData.append("name", values.name);
      formData.append("introduction1", values.introduction1);
      formData.append("introduction2", values.introduction2);
      formData.append("organization", values.organization);
      formData.append("specialization", values.specialization);
      formData.append("education", values.education);
      formData.append("industry", values.industry);
      formData.append("field", values.field);
      formData.append("experience", values.experience);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      if (companyLogoFile) {
        formData.append("companyLogo", companyLogoFile);
      }
      await onSubmit(formData);
      form.resetFields();
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };
  const handleLogoChange = (event) => {
    setCompanyLogoFile(event.target.files[0]);
  };

  return (
    <Modal
      title="Add Mentor"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="mentor-add-modal"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the mentor's name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="avatar"
              label="Avatar URL"
              rules={[
                { required: true, message: "Please enter the avatar URL!" },
              ]}
            >
              <Input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item
          name="menteeCount"
          label="Mentee Count"
          rules={[
            { required: true, message: "Please enter the mentee count!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item> */}
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="introduction1"
              label="Introduction 1"
              rules={[
                {
                  required: true,
                  message: "Please enter the first introduction!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="organization"
              label="Organization"
              rules={[
                { required: true, message: "Please enter the organization!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="specialization"
              label="Specialization"
              rules={[
                { required: true, message: "Please enter the specialization!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="education"
              label="Education"
              rules={[
                { required: true, message: "Please enter the education!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="industry"
              label="Industry"
              rules={[
                { required: true, message: "Please enter the industry!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
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
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item name="companyLogo" label="Company Logo">
              <Input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleLogoChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="field" label="Field">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="experience" label="Experience">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button className="add-modal-btn" htmlType="submit">
            Add Mentor
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MentorFormModal;

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Row, Col, Select } from "antd";
import "./MentorPage.css";
import { API } from "../../../constant";
const { Option } = Select;

const MentorFormModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [enterprises, setEnterprises] = useState([]);
  const [studies, setStudies] = useState([]);
  const [domains, setDomains] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API}/api/v1/admin/listCategory`);
        const data = await response.json();
        console.log(data);
        
        if (data.code === 200) {
          setEnterprises(data.enterprises);
          setStudies(data.studies);
          setDomains(data.domains);
          setSpecializations(data.specialization);
        } else {
          message.error("Failed to load categories.");
        }
      } catch (error) {
        message.error("An error occurred while fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
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
      centered
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
        <Row gutter={[25, 60]}>
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
              <Select>
                {enterprises.map((enterprise) => (
                  <Option key={enterprise._id} value={enterprise.description}>
                    {enterprise.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="specialization"
              label="Specialization"
              rules={[
                { required: true, message: "Please select the specialization!" },
              ]}
            >
              <Select>
                {specializations.map((specialization) => (
                  <Option key={specialization._id} value={specialization.description}>
                    {specialization.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="education"
              label="Education"
              rules={[
                { required: true, message: "Please select the education!" },
              ]}
            >
              <Select>
                {studies.map((study) => (
                  <Option key={study._id} value={study.description}>
                    {study.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="industry"
              label="Industry"
              rules={[
                { required: true, message: "Please select the industry!" },
              ]}
            >
              <Select>
                {domains.map((domain) => (
                  <Option key={domain._id} value={domain.description}>
                    {domain.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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

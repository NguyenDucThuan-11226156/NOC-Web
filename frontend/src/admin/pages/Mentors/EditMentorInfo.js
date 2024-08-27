import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import { detailMentor, updateMentor } from "../../../services/mentorsServices";
const EditMentorInfo = ({ visible, onClose, mentorId, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mentorId && visible) {
      fetchMentorDetail();
    }
  }, [mentorId, visible]);

  const fetchMentorDetail = async () => {
    try {
      const response = await detailMentor(mentorId);
      const mentorData = response.mentor[0];
      form.setFieldsValue({
        name: mentorData.name,
        avatar: mentorData.avatar,
        introduction1: mentorData.introduction1,
        introduction2: mentorData.introduction2,
        organization: mentorData.organization,
        specialization: mentorData.specialization,
        education: mentorData.education,
        industry: mentorData.industry,
      });
    } catch (error) {
      console.error("Error fetching mentor details:", error);
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      await updateMentor(mentorId, values);
      onUpdateSuccess(); // Callback to notify parent component about the update
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating mentor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Mentor"
      onCancel={onClose}
      className="edit-mentor-modal"
      centered
      footer={[
        <Button className="cancel-btn" key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          className="save-btn"
        >
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Row gutter={[25, 25]}>
          <Col span={24}>
            <Form.Item name="name" label="Name" className="edit-mentor-item">
              <Input />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item name="avatar" label="Avatar URL" className="edit-mentor-item">
              <Input />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={[25, 25]}>
          <Col span={12}>
            <Form.Item
              name="introduction1"
              label="Introduction 1"
              className="edit-mentor-item"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="introduction2"
              label="Introduction 2"
              className="edit-mentor-item"
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
              className="edit-mentor-item"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="specialization"
              label="Specialization"
              className="edit-mentor-item"
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
              className="edit-mentor-item"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="industry"
              label="Industry"
              className="edit-mentor-item"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditMentorInfo;

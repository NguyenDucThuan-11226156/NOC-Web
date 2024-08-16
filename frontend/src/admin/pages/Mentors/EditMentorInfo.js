import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { detailMentor, updateMentor } from '../../../services/mentorsServices';

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
      title="Edit Mentor Information"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar URL">
          <Input />
        </Form.Item>
        <Form.Item name="introduction1" label="Introduction 1">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="introduction2" label="Introduction 2">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="organization" label="Organization">
          <Input />
        </Form.Item>
        <Form.Item name="specialization" label="Specialization">
          <Input />
        </Form.Item>
        <Form.Item name="education" label="Education">
          <Input />
        </Form.Item>
        <Form.Item name="industry" label="Industry">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMentorInfo;

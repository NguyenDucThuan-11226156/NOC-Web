import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { limit } from "../../../constant";
import {
  createMentor,
  deleteMentor,
  postMentorList,
} from "../../../services/mentorsServices";
import MentorFormModal from "./MentorFormModal";
import EditMentorInfo from "./EditMentorInfo";
import "./MentorPage.css";

const { confirm } = Modal;

const MentorsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFinal, setDataFinal] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, [currentPage]);

  const fetchMentors = async () => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const result = await postMentorList(offset);
    setDataFinal(
      result.mentors.map((mentor) => ({
        key: mentor._id,
        name: mentor.name,
        study: mentor.industry,
        education: mentor.education,
      }))
    );
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this mentor?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const response = await deleteMentor(id);
          if (response.code === 200) {
            message.success("Mentor deleted successfully!");
            setDataFinal((prev) => prev.filter((mentor) => mentor.key !== id));
          } else {
            message.error("Failed to delete mentor. Please try again.");
          }
        } catch (error) {
          message.error("An error occurred. Please try again.");
        }
      },
    });
  };

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelAddModal = () => {
    setIsModalVisible(false);
  };

  const handleAddMentor = async (values) => {
    try {
      const response = await createMentor(values);
      if (response.code === 200) {
        message.success("Mentor created successfully!");
        setIsModalVisible(false);
        setDataFinal([
          ...dataFinal,
          {
            key: response.data._id,
            name: response.data.name,
            study: response.data.industry,
            education: response.data.education,
          },
        ]);
      } else {
        message.error("Failed to create mentor. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const showEditModal = (mentorId) => {
    setSelectedMentorId(mentorId);
    setIsEditModalVisible(true);
  };

  const handleCancelEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedMentorId(null);
  };

  const handleEditSuccess = () => {
    fetchMentors();
    handleCancelEditModal();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Industry",
      dataIndex: "study",
      key: "study",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button className="edit-btn" onClick={() => showEditModal(record.key)}>Edit</Button>
          <Button
            className="delete-btn"
            onClick={() => handleDelete(record.key)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card style={{borderRadius: '30px'}}>
      <h2 className="mentor-title">Mentor</h2>
      <Table columns={columns} dataSource={dataFinal} className="mentor-table" />
      <MentorFormModal
        visible={isModalVisible}
        onCancel={handleCancelAddModal}
        onSubmit={handleAddMentor}
      />
      {selectedMentorId && (
        <EditMentorInfo
          visible={isEditModalVisible}
          onClose={handleCancelEditModal}
          mentorId={selectedMentorId}
          onUpdateSuccess={handleEditSuccess}
        />
      )}
      <Button className="add-table-btn" onClick={showAddModal}>
        Add Mentor
      </Button>
      </Card>
    </>
  );
};

export default MentorsManagement;

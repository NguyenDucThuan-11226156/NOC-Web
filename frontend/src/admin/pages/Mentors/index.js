import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { limit } from "../../../constant";
import {
  createMentor,
  deleteMentor,
  postMentorList,
} from "../../../services/mentorsServices";
import MentorFormModal from "./MentorFormModal";

const { confirm } = Modal;

const MentorsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFinal, setDataFinal] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const fetchApi = async () => {
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
    fetchApi();
    // console.log(currentPage);
  }, [currentPage]);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giáo dục",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Học vấn",
      dataIndex: "study",
      key: "study",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(record.key)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Mentor
      </Button>
      <Table columns={columns} dataSource={dataFinal} />
      <MentorFormModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleAddMentor}
      />
    </>
  );
};

export default MentorsManagement;

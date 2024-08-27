import React, { useState } from "react";
import { Button, Space, Table, message, Form } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import '../../pages/CreateCategory/Categories.css';
import { API } from "../../../constant";
import EditCategoryModal from "../../pages/CreateCategory/EditCategoryModal";  // Import component

const TableSpecialization = ({ specializations, fetchCategories }) => {
  const [cookies] = useCookies(['tokenAdmin']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState({}); // Track loading state for each row

  const [form] = Form.useForm();

  const handleDelete = async (id) => {
    setLoadingDelete((prevState) => ({ ...prevState, [id]: true })); // Set loading state to true for the specific row

    try {
      const response = await axios.delete(`${API}/api/v1/admin/deleteSpecialization/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`,
        },
      });
      if (response.data.code === 200) {
        message.success("Specialization deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete specialization");
      }
    } catch (error) {
      message.error("An error occurred while deleting the specialization");
    } finally {
      setLoadingDelete((prevState) => ({ ...prevState, [id]: false })); // Set loading state to false after the process completes
    }
  };

  const showEditModal = (specialization) => {
    setSelectedSpecialization(specialization);
    form.setFieldsValue({ specialization: specialization.description });
    setIsModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(`${API}/api/v1/admin/editSpecialization/${selectedSpecialization._id}`, {
        specialization: values.specialization,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`,
        },
      });

      if (response.data.code === 200) {
        message.success("Specialization updated successfully");
        await fetchCategories();
        setIsModalVisible(false);
      } else {
        message.error("Failed to update specialization");
      }
    } catch (error) {
      message.error("An error occurred while updating the specialization");
    }
  };

  const columns = [
    {
      title: "Số thứ tự",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="edit-categories-btn"
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            className="delete-categories-btn"
            loading={loadingDelete[record._id]} // Set loading state
            onClick={() => handleDelete(record._id)}
            disabled={loadingDelete[record._id]}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table className="categories-table" columns={columns} dataSource={specializations} />
      <EditCategoryModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        form={form}
        categoryName="Specialization"
      />
    </>
  );
};

export default TableSpecialization;

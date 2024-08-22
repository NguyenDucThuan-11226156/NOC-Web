import React, { useState } from "react";
import { Button, Space, Table, message, Form } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import '../../pages/CreateCategory/Categories.css';
import { API } from "../../../constant";
import EditCategoryModal from "../../pages/CreateCategory/EditCategoryModal"; // Import component

const TableEnterprise = ({ enterprises, fetchCategories }) => {
  const [cookies] = useCookies(['tokenAdmin']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  const [form] = Form.useForm();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/api/v1/admin/deleteEnterprise/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`,
        },
      });
      if (response.data.code === 200) {
        message.success("Enterprise deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete enterprise");
      }
    } catch (error) {
      message.error("An error occurred while deleting the enterprise");
    }
  };

  const showEditModal = (enterprise) => {
    setSelectedEnterprise(enterprise);
    form.setFieldsValue({ enterprise: enterprise.description });
    setIsModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(`${API}/api/v1/admin/editEnterprise/${selectedEnterprise._id}`, {
        enterprise: values.enterprise,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`,
        },
      });

      if (response.data.code === 200) {
        message.success("Enterprise updated successfully");
        await fetchCategories();
        setIsModalVisible(false);
      } else {
        message.error("Failed to update enterprise");
      }
    } catch (error) {
      message.error("An error occurred while updating the enterprise");
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
      title: "Doanh nghiệp",
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
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table className="categories-table" columns={columns} dataSource={enterprises} />
      <EditCategoryModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        form={form}
        categoryName="Enterprise"
      />
    </>
  );
};

export default TableEnterprise;

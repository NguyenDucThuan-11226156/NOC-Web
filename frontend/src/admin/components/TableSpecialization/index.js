import React from "react";
import { Button, Space, Table, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie"; // Import useCookies
import '../../pages/CreateCategory/Categories.css';
import { API } from "../../../constant";

const TableSpecialization = ({ specializations, fetchCategories }) => {
  const [cookies] = useCookies(['tokenAdmin']); // Access the tokenAdmin cookie

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/api/v1/admin/deleteSpecialization/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`, // Include the token in the headers
        },
      });
      if (response.data.code === 200) {
        message.success("Specialization deleted successfully");
        fetchCategories(); // Refresh the category list after deletion
      } else {
        message.error("Failed to delete specialization");
      }
    } catch (error) {
      message.error("An error occurred while deleting the specialization");
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
          <Button className="edit-categories-btn">Edit</Button>
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

  return <Table className="categories-table" columns={columns} dataSource={specializations} />;
};

export default TableSpecialization;

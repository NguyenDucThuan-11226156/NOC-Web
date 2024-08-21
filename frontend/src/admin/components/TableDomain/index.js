import React from "react";
import { Button, Space, Table, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import '../../pages/CreateCategory/Categories.css';
import { API } from "../../../constant";

const TableDomain = ({ domains, fetchCategories }) => {
  const [cookies] = useCookies(['tokenAdmin']);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/api/v1/admin/deleteDomain/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`,
        },
      });
      if (response.data.code === 200) {
        message.success("Domain deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete domain");
      }
    } catch (error) {
      message.error("An error occurred while deleting the domain");
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

  return <Table className="categories-table" columns={columns} dataSource={domains} />;
};

export default TableDomain;

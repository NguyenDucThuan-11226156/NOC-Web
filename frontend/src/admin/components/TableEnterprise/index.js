import React, { useState } from "react";
import { Button, Space, Table, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import '../../pages/CreateCategory/Categories.css';
import { API } from "../../../constant";

const TableEnterprise = ({ enterprises, fetchCategories }) => {
  const [cookies] = useCookies(['tokenAdmin']);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);

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
    } finally {
      setLoadingId(null);
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
            loading={loadingId === record._id} // Set loading state
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table className="categories-table" columns={columns} dataSource={enterprises} />;
};

export default TableEnterprise;

import React from "react";
import { Button, Space, Table, Tag } from "antd";
import'../../pages/CreateCategory/Categories.css'
const columns = [
  {
    title: "Số thứ tự",
    render: (text, record, index) => <a>{index + 1}</a>, // Incrementing the index
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
        <Button className="delete-categories-btn">Delete</Button>
      </Space>
    ),
  },
];
const TableDomain = ({ domains }) => {
  return <Table className="categories-table" columns={columns} dataSource={domains} />;
};
export default TableDomain;

import React from "react";
import { Space, Table, Tag } from "antd";
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
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const TableDomain = ({ enterprises }) => {
  return <Table columns={columns} dataSource={enterprises} />;
};
export default TableDomain;

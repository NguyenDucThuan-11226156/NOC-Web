import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useState } from "react";
import { limit } from "../../../constant";
import { postMentorList } from "../../../services/mentorsServices";
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
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    education: 32,
    study: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    education: 42,
    study: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    education: 32,
    study: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const MentorsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFinal, setDataFinal] = useState(data);
  useEffect(() => {
    const offset = {
      limit: limit,
      page: currentPage,
    };
    const fetchApi = async () => {
      const result = await postMentorList(offset);
      console.log(result.mentors);
      setDataFinal((prev) => {
        return result.mentors.map((mentor) => {
          return {
            key: mentor._id,
            name: mentor.name,
            study: mentor.industry,
            education: mentor.education,
          };
        });
      });
    };
    fetchApi();
  }, []);
  return <Table columns={columns} dataSource={dataFinal} />;
};
export default MentorsManagement;

import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "antd";
import axios from "axios";
import { DownloadOutlined, FileExcelOutlined } from "@ant-design/icons";
import CommonUtils from "../../../utils/CommonUtils";
import { API } from "../../../constant";
import './Users.css'

function Users() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await axios.get(`${API}/api/v1/admin/excel`);
        if (res && res.data && res.data.data) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOnClickExport = async () => {
    try {
      let res = await axios.get(`${API}/api/v1/admin/excel`);

      if (res && res.data && res.data.data) {
        await CommonUtils.exportExcel(res.data.data, "Danh sách Users", "ListUsers");
      }
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },
  ];

  return (
    <Card style={{ borderRadius: "30px", padding: "20px" }}>
      <h2 className="user-title">Users</h2>
      <Button
        onClick={handleOnClickExport}
        type="primary"
        icon={<FileExcelOutlined />}
        style={{ marginBottom: 16 }}
        className="export-btn"
      >
        Export to Excel
      </Button>
      <Table columns={columns} dataSource={userData} loading={loading} rowKey="studentId" className="users-table" />
    </Card>
  );
}

export default Users;
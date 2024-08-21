import React from "react";
import { Card, Upload, Divider, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../../constant"; // Adjust the import path
import { useCookies } from "react-cookie";

const SettingGeneral = () => {
  const [cookies] = useCookies(["token"]); // Adjust cookie name if necessary

  const handleUpload = async (info, endpoint) => {
    const { file } = info;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.tokenAdmin}`, // Add token to headers
        },
      });

      message.success(response.data.message);
    } catch (error) {
      message.error("Failed to upload file");
    }
  };

  const uploadProps = (endpoint) => ({
    accept: ".jpg,.png",
    showUploadList: false,
    customRequest: (info) => handleUpload(info, endpoint),
  });

  return (
    <>
      <Card>
        <div>Avatar Default</div>
        <Upload {...uploadProps("/api/v1/admin/editAvatarDefault")}>
          <div style={{ cursor: "pointer" }}>
            <UploadOutlined /> Click to Upload
          </div>
        </Upload>
      </Card>
      <Divider />
      <Card>
        <div>Home Banner</div>
        <Upload {...uploadProps("/api/v1/admin/editHomeBanner")}>
          <div style={{ cursor: "pointer" }}>
            <UploadOutlined /> Click to Upload
          </div>
        </Upload>
      </Card>
      <Divider />
      <Card>
        <div>User Banner</div>
        <Upload {...uploadProps("/api/v1/admin/editUserBanner")}>
          <div style={{ cursor: "pointer" }}>
            <UploadOutlined /> Click to Upload
          </div>
        </Upload>
      </Card>
    </>
  );
};

export default SettingGeneral;

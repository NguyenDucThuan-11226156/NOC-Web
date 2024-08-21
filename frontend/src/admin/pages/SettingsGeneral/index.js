import React from "react";
import { Card, Upload, Divider, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../../constant"; // Adjust the import path
import { useCookies } from "react-cookie";
import "./Settings.css";

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
      <Card className="setting-item">
        <div className="setting-title">Avatar Default</div>
        <div className="setting-ava-default">
          <img src="" alt="avatar-default" />
        </div>
        <Upload {...uploadProps("/api/v1/admin/editAvatarDefault")}>
          <Button className="upload-btn">
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
      <Divider />
      <Card className="setting-item">
        <div className="setting-title">Home Banner</div>
        <div className="setting-homebanner">
        <img src="" alt="home-banner" />
        </div>
        <Upload {...uploadProps("/api/v1/admin/editHomeBanner")}>
          <Button className="upload-btn">
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
      <Divider />
      <Card className="setting-item">
        <div className="setting-title">User Banner</div>
        <div className="setting-userbanner">
        <img src="" alt="user-banner" />
        </div>
        <Upload {...uploadProps("/api/v1/admin/editUserBanner")}>
          <Button className="upload-btn">
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
    </>
  );
};

export default SettingGeneral;

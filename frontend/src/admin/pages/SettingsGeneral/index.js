import React, { useEffect, useState } from "react";
import { Card, Upload, Divider, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../../constant"; // Adjust the import path
import { useCookies } from "react-cookie";
import "./Settings.css";

const SettingGeneral = () => {
  const [cookies] = useCookies(["token"]); // Adjust cookie name if necessary
  const [settings, setSettings] = useState({
    avatarDefault: "",
    homeBanner: "",
    userBanner: "",
  });

  const [loading, setLoading] = useState({
    avatarDefault: false,
    homeBanner: false,
    userBanner: false,
  });

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/admin/getSettings`, {
        headers: {
          Authorization: `Bearer ${cookies.tokenAdmin}`, // Add token to headers
        },
      });

      if (response.data.code === 200) {
        const data = response.data.data[0]; // Assuming your data is in the first object
        setSettings({
          avatarDefault: data.avatarDefault,
          homeBanner: data.homeBanner,
          userBanner: data.userBanner,
        });
      } else {
        message.error("Failed to fetch settings data");
      }
    } catch (error) {
      message.error("Failed to fetch settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [cookies.tokenAdmin]);

  const handleUpload = async (info, endpoint, key) => {
    const { file } = info;
    const formData = new FormData();
    formData.append("file", file);

    setLoading((prevLoading) => ({ ...prevLoading, [key]: true }));

    try {
      const response = await axios.post(`${API}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.tokenAdmin}`, // Add token to headers
        },
      });

      if (response.data.code === 200) {
        message.success(response.data.message);
        fetchSettings(); // Re-fetch settings to update the images
      } else {
        message.error("Failed to upload file1");
      }
    } catch (error) {
      message.error("Failed to upload file1");
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [key]: false }));
    }
  };

  const uploadProps = (endpoint, key) => ({
    accept: ".jpg,.png",
    showUploadList: false,
    customRequest: (info) => handleUpload(info, endpoint, key),
  });

  return (
    <>
      <Card className="setting-item">
        <div className="setting-title">Avatar Default</div>
        <div className="setting-ava-default">
          <img src={settings.avatarDefault} alt="avatar-default" />
        </div>
        <Upload
          {...uploadProps("/api/v1/admin/editAvatarDefault", "avatarDefault")}
        >
          <Button className="upload-btn" loading={loading.avatarDefault}>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
      <Divider />
      <Card className="setting-item">
        <div className="setting-title">Home Banner</div>
        <div className="setting-homebanner">
          <img src={settings.homeBanner} alt="home-banner" />
        </div>
        <Upload {...uploadProps("/api/v1/admin/editHomeBanner", "homeBanner")}>
          <Button className="upload-btn" loading={loading.homeBanner}>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
      <Divider />
      <Card className="setting-item">
        <div className="setting-title">User Banner</div>
        <div className="setting-userbanner">
          <img src={settings.userBanner} alt="user-banner" />
        </div>
        <Upload {...uploadProps("/api/v1/admin/editUserBanner", "userBanner")}>
          <Button className="upload-btn" loading={loading.userBanner}>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Card>
    </>
  );
};

export default SettingGeneral;

import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Tabs, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeInfoUser from "../../components/ChangeInfoUser"; // Import the ChangeInfoUser component
import "./InfoUser.css"; // Ensure you create this CSS file for custom styles

const { TabPane } = Tabs;
const { Title } = Typography;

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [myMentors, setMyMentors] = useState([]);
  const [savedMentors, setSavedMentors] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details and mentors from the mock API
    const fetchData = async () => {
      try {
        const userResponse = await axios.post(
          "http://localhost:8000/api/v1/users/detail"
        );
        const mentorResponse = await axios.get(
          "http://localhost:8000/api/v1/mentors"
        );

        if (userResponse.data.code === 200) {
          setUserInfo(userResponse.data.info);
        }

        if (mentorResponse.data.code === 200) {
          setMyMentors(mentorResponse.data.myMentors);
          setSavedMentors(mentorResponse.data.savedMentors);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditModalVisible(true); // Show the modal when Edit is clicked
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false); // Close the modal
  };

  const handleDeleteSavedMentor = async (mentorId) => {
    try {
      // Implement the delete request logic here
      await axios.delete(`http://localhost:8000/api/v1/mentors/${mentorId}`);
      // Update the saved mentors list after deletion
      setSavedMentors(savedMentors.filter((mentor) => mentor._id !== mentorId));
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  return (
    <div className="info-user-container">
      <Card bordered={false} className="info-user-card">
        <Row gutter={[0, 20]} className="info-user-main-header">
          <Col span={24}>
            <div className="user-banner">
              <img src="/path/to/banner-image.png" alt="Banner" />
            </div>
          </Col>
          <Col span={24}>
            <div className="user-info-header">
              <Avatar
                src={userInfo.avatar}
                size={190}
                className="user-avatar"
              />
              <Title level={3}>{userInfo.name}</Title>{" "}
            </div>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="1"
          size="large"
          className="info-user-tabs"
          centered
        >
          <TabPane tab="Trang cá nhân" key="1">
            <Card className="user-info-card">
              <Title level={4}>Thông tin</Title>
              <div className="user-info-border"></div>
              <Row>
                <Col span={24} offset={10} className="user-info-list">
                  <li>Họ và tên: {userInfo.name}</li>
                  <br />
                  <li>Lớp học phần: {userInfo.school}</li>
                  <br />
                  <li>Mã sinh viên: {userInfo.studentId}</li>
                  <br />
                  <li>Email: {userInfo.email}</li>
                  <br />
                  <li>Số điện thoại: {userInfo.number}</li>
                  <br />
                </Col>
              </Row>
              {/* <p>Description: {userInfo.description}</p> */}
              <div className="user-info-change" onClick={handleEditClick}>
                Chỉnh sửa
              </div>
            </Card>
          </TabPane>
          <TabPane tab="Mentor của tôi" key="2">
            <Card className="mentor-info-card">
              <Row gutter={[16, 16]} className="mentor-info-item">
                <Title level={4}>My Mentor</Title>
                <div className="mentor-info-border"></div>
                {myMentors.map((mentor) => (
                  <Col key={mentor.id} span={12}>
                    <Card
                      className="mentor-info-subCard"
                      title={mentor.name}
                      extra={
                        <img src={mentor.companyLogo} alt="Company Logo" />
                      }
                      cover={<img alt="avatar" src={mentor.avatar} />}
                      actions={[
                        <Button
                          onClick={() => navigate(`/mentors/${mentor.slug}`)}
                        >
                          View more
                        </Button>,
                        <Button
                          onClick={() =>
                            navigate(`/mentors/${mentor.slug}/review`)
                          }
                        >
                          My Review
                        </Button>,
                      ]}
                    >
                      <p>Mentee Count: {mentor.menteeCount}</p>
                      <p>Introduction 1: {mentor.introduction1}</p>
                      <p>Introduction 2: {mentor.introduction2}</p>
                      <p>
                        Rate: {mentor.rate}/5 ({mentor.numberRate} ratings)
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row gutter={[16, 16]} className="mentor-info-item">
                <Title level={4}>Đã lưu</Title>
                <div className="mentor-info-border"></div>

                {savedMentors.map((mentor) => (
                  <Col key={mentor._id} span={12}>
                    <Card
                      title={mentor.name}
                      extra={
                        <img src={mentor.companyLogo} alt="Company Logo" />
                      }
                      cover={<img alt="avatar" src={mentor.avatar} />}
                      actions={[
                        <Button
                          onClick={() => navigate(`/mentors/${mentor.slug}`)}
                        >
                          View more
                        </Button>,
                        <Button
                          onClick={() => handleDeleteSavedMentor(mentor._id)}
                          icon={<DeleteOutlined />}
                        />,
                      ]}
                    >
                      <p>Mentee Count: {mentor.menteeCount}</p>
                      <p>Introduction 1: {mentor.introduction1}</p>
                      <p>Introduction 2: {mentor.introduction2}</p>
                      <p>
                        Rate: {mentor.rate}/5 ({mentor.numberRate} ratings)
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>
          <TabPane tab="Trợ giúp" key="3">
            <Card className="help-info-card">
              <Title level={4}>Trợ giúp</Title>
              <p>Some help content here.</p>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
      <ChangeInfoUser
        visible={isEditModalVisible}
        onClose={handleModalClose}
        userInfo={userInfo}
      />
    </div>
  );
};

export default InfoUser;

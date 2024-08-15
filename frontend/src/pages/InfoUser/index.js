import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Rate, Row, Tabs, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ChangeInfoUser from "../../components/ChangeInfoUser";
import "./InfoUser.css";
import { API } from "../../constant";
import defaultAvatar from "../../images/Default/Avatar/capybaraNEU.jpg";
import defaultBanner from "../../images/Default/Background/NYF_BG.jpg";
import ApplyModal from "../../components/ApplyModal";
const { TabPane } = Tabs;
const { Title } = Typography;

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [myMentors, setMyMentors] = useState([]);
  const [savedMentors, setSavedMentors] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${API}/api/v1/users/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.data.code === 200) {
          setUserInfo(userResponse.data.info);
          setMyMentors(userResponse.data.infoMentors);
          setSavedMentors(userResponse.data.saveInfoMentors);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
  };
  const handleApplyModal = () => {
    setIsApplyModalVisible(!isApplyModalVisible);
  };
  const handleCancel = () => {
    setIsApplyModalVisible(false);
  };
  const handleViewMore = (mentor) => {
  
    navigate(`/mentors/detail/${mentor._id}`);
  };
  const handleDeleteSavedMentor = async (mentorId) => {
    try {
      await axios.delete(`${API}/api/v1/mentors/${mentorId}`);
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
              <img src={userInfo.banner || defaultBanner} alt="Banner" />
            </div>
          </Col>
          <Col span={24}>
            <div className="user-info-header">
              <Avatar
                src={userInfo.avatar || defaultAvatar}
                size={190}
                className="user-avatar"
              />
              <Title level={3}>{userInfo.name}</Title>
            </div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" size="large" className="info-user-tabs" centered>
          <TabPane tab="Trang cá nhân" key="1">
            <Card className="user-info-card">
              <Title level={4}>Thông tin</Title>
              <div className="user-info-border"></div>
              <Row>
                <Col span={24} offset={2} className="user-info-list">
                  <li>Họ và tên: {userInfo.name}</li>
                  <br />
                  <li>Lớp học phần: {userInfo.school}</li>
                  <br />
                  <li>Mã sinh viên: {userInfo.studentId}</li>
                  <br />
                  <li>Email: {userInfo.email}</li>
                  <br />
                  <li>Số điện thoại: +84 {userInfo.number}</li>
                  <br />
                </Col>
              </Row>
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
                      extra={<img src={mentor.companyLogo} alt="Company Logo" />}
                      cover={<img alt="avatar" src={mentor.avatar || defaultAvatar} />}
                      actions={[
                        <Button onClick={() => navigate(`/mentors/${mentor.slug}`)}>
                          View more
                        </Button>,
                        <Button onClick={() => navigate(`/mentors/${mentor.slug}/review`)}>
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
                  <Row>
                    <Col span={10} className='mentorCard-image'>
                      <img
                        src={mentor.avatar}
                        alt="Avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col key={mentor._id} span={13} className='mentorCard-content'>
                      
                      <h3>{mentor.name}</h3>
                      <div className='mentorCard-content-logo'>
                        <img src={mentor.companyLogo} alt='Company logo' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p className='mentorCard-content-menteeCount'>Mentee: {mentor.menteeCount}</p>
                      <p className='mentorCard-content-introduction'>Mục giới thiệu 1: {mentor.introduction1}</p>
                      <p className='mentorCard-content-introduction'>Mục giới thiệu 2: {mentor.introduction2}</p>
                      <Rate className='mentorCard-content-rate' disabled defaultValue={mentor.rate} />
                      <p className='mentorCard-content-rateCount'>({mentor.numberRate} đánh giá) ({mentor.rate}/5)</p>
                      <Button className='mentorCard-content-Btn' onClick={handleApplyModal}>Apply now</Button>
                      <ApplyModal open={isApplyModalVisible} onCancel={handleCancel} />
                      <Button className='mentorCard-content-Btn' onClick={() => handleViewMore(mentor)}>View more</Button>
                      <Button className='mentorCard-content-Btn' onClick={() => handleDeleteSavedMentor(mentor._id)} icon={<DeleteOutlined />} />,
                    </Col>
                  </Row>

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

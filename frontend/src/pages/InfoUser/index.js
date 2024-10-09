import React, { useEffect, useState } from "react";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  notification,
  Rate,
  Row,
  Skeleton,
  Tabs,
  Typography,
} from "antd";
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
  const [isLoading, setIsLoading] = useState(true); // Loading state for skeleton
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [loadingMentor, setLoadingMentor] = useState(null);
  const [banner, setBanner] = useState('');
  const [avatar, setAvatar] = useState('');

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

        const settingsResponse = await axios.get(`${API}/api/v1/admin/getSettings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (settingsResponse.data.code === 200) {
          const data = settingsResponse.data.data[0]; 
          setBanner(data.userBanner || data.homeBanner || defaultBanner); 
          setAvatar(data.avatarDefault || defaultAvatar); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
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
    setLoadingMentor(mentorId); // Bắt đầu trạng thái loading
    try {
      await axios.delete(`${API}/api/v1/users/deleteSaveMentor/${mentorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedMentors(savedMentors.filter((mentor) => mentor._id !== mentorId));
      notification.success({
        message: "Thành công",
        description: "Mentor đã được xóa khỏi danh sách đã lưu.",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi xóa mentor. Vui lòng thử lại.",
      });
      console.error("Error deleting mentor:", error);
    } finally {
      setLoadingMentor(null); // Kết thúc trạng thái loading
    }
  };
  return (
    <div className="info-user-container">
      {isLoading ? (
        <>
          <Skeleton.Avatar active size={160} shape="circle" className="user-avatar-skeleton" />
          <Skeleton active paragraph={{ rows: 4 }} className="user-info-skeleton" />
        </>
      ) : (
        <Card bordered={false} className="info-user-card">
          <Row gutter={[0, 20]} className="info-user-main-header">
            <Col span={24}>
              <div className="user-banner">
                <img src={banner || defaultBanner} alt="Banner" />
              </div>
            </Col>
            <Col span={24}>
              <div className="user-info-header">
                <Avatar
                  src={userInfo.avatar || avatar || defaultAvatar}
                  size={160}
                  className="user-avatar"
                />
                <Title level={3}>{userInfo.name}</Title>
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
                <Col xl={5} lg={6} md={8} sm={8} xs={24}>
                  <Title level={4}>Thông tin</Title>
                </Col>
                <Col xl={1} lg={1} md={1} sm={1} xs={24}>
                  <div className="user-info-border"></div>
                </Col>
                <Col xl={17} lg={17} md={15} sm={15} xs={24}>
                  <Row justify="space-between">
                    <Col span={24} className="user-info-list">
                      <li>Họ và tên: {userInfo.name}</li>
                      <br />
                      <li>Lớp học phần: {userInfo.school}</li>
                      <br />
                      <li>Mã sinh viên: {userInfo.studentId}</li>
                      <br />
                      <li>Email: {userInfo.email}</li>
                      <br />
                      <li>Số điện thoại: (+84) {userInfo.number}</li>
                      <br />
                    </Col>
                  </Row>
                </Col>
                <div className="user-info-change" onClick={handleEditClick}>
                  Chỉnh sửa
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Mentor của tôi" key="2">
              <Card className="mentor-info-card">
                <Row
                  gutter={[16, 16]}
                  className="mentor-info-item"
                  justify="space-evenly"
                >
                  <Col xl={4} lg={7} md={8} xs={24}>
                    <Title level={4}>My Mentor ({myMentors.length})</Title>
                  </Col>
                  <Col xl={1} lg={1} md={1} xs={0}>
                    <div className="mentor-info-border"></div>
                  </Col>
                  <Col xl={19} lg={15} md={15} xs={24}>
                    <Row gutter={[0, 20]} justify="space-between">
                      {myMentors.map((mentor) => (
                        <Col xl={12} lg={24} md={24} xs={24}>
                          <Row key={mentor._id} className="mentorCard">
                            <Col xl={10} lg={10} md={10} xs={24} className="mentorCard-image">
                              <img src={mentor.avatar} alt="Avatar" />
                            </Col>
                            <Col xl={13} lg={13} md={13} xs={24} className="mentorCard-content">
                              <h3>{mentor.name}</h3>
                              <div className="mentorCard-content-logo">
                                <img
                                  src={mentor.companyLogo}
                                  alt="Company logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <p className="mentorCard-content-menteeCount">
                                Mentee: {mentor.menteeCount || 0}
                              </p>
                              <p className="mentorCard-content-introduction">
                                Mục giới thiệu 1: {mentor.introduction1}
                              </p>
                              <p className="mentorCard-content-introduction">
                                Mục giới thiệu 2: {mentor.introduction2}
                              </p>
                              <Rate
                                className="mentorCard-content-rate"
                                disabled
                                defaultValue={mentor.rate}
                              />
                              <p className="mentorCard-content-rateCount">
                              ({mentor.numberRate || 0} đánh giá) ({mentor.rate?.toFixed(2) || 0}/5)
                              </p>
                              <div className="mentorCard-btnContainer">
                                <Button
                                  className="mentorCard-content-Btn-myMentor"
                                  style={{ width: "100%" }}
                                  onClick={() => handleViewMore(mentor)}
                                >
                                  View more
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={[16, 16]}
                  className="mentor-info-item"
                  justify="center"
                >
                  <Col xl={4} lg={7} md={8} xs={24}>
                    <Title level={4}>Đã lưu ({savedMentors.length})</Title>
                  </Col>
                  <Col xl={1} lg={1} md={1} xs={0}>
                    <div className="mentor-info-border"></div>
                  </Col>
                  <Col xl={19} lg={15} md={15} xs={24}>
                    <Row gutter={[0, 20]} justify="space-between">
                      {savedMentors.map((mentor) => (
                        <Col xl={12} lg={24} md={24} xs={24}>
                          <Row key={mentor._id} className="mentorCard">
                            <Col xl={10} lg={10} md={10} xs={24} className="mentorCard-image">
                              <img src={mentor.avatar} alt="Avatar" />
                            </Col>
                            <Col
                              key={mentor._id}
                              xl={13}
                              xs={24}
                              lg={13}
                              md={13}
                              className="mentorCard-content"
                            >
                              <h3>{mentor.name}</h3>
                              <div className="mentorCard-content-logo">
                                <img
                                  src={mentor.companyLogo}
                                  alt="Company logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <p className="mentorCard-content-menteeCount">
                                Mentee: {mentor.menteeCount || 0}
                              </p>
                              <p className="mentorCard-content-introduction">
                                Mục giới thiệu 1: {mentor.introduction1}
                              </p>
                              <p className="mentorCard-content-introduction">
                                Mục giới thiệu 2: {mentor.introduction2}
                              </p>
                              <Rate
                                className="mentorCard-content-rate"
                                disabled
                                defaultValue={mentor.rate}
                              />
                              <p className="mentorCard-content-rateCount">
                              ({mentor.numberRate || 0} đánh giá) ({mentor.rate?.toFixed(2) || 0}/5)
                              </p>
                              <div className="mentor-btn-container">
                                <Button
                                  className="mentorCard-content-Btn"
                                  onClick={handleApplyModal}
                                >
                                  Apply now
                                </Button>
                                <ApplyModal
                                  open={isApplyModalVisible}
                                  onCancel={handleCancel}
                                />
                                <Button
                                  className="mentorCard-content-Btn"
                                  onClick={() => handleViewMore(mentor)}
                                >
                                  View more
                                </Button>
                                <Button
                                  className="mentorCard-content-Btn"
                                  onClick={() =>
                                    handleDeleteSavedMentor(mentor._id)
                                  }
                                  icon={
                                    loadingMentor === mentor._id ? (
                                      <LoadingOutlined />
                                    ) : (
                                      <DeleteOutlined />
                                    )
                                  }
                                  disabled={loadingMentor === mentor._id}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
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
      )}
      <ChangeInfoUser
        visible={isEditModalVisible}
        onClose={handleModalClose}
        userInfo={userInfo}
      />
    </div>
  );
};

export default InfoUser;
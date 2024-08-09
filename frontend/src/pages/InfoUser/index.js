import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function InfoUser() {
  const [userInfo, setUserInfo] = useState({});
  const [myMentors, setMyMentors] = useState([]);
  const [savedMentors, setSavedMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details and mentors from the mock API
    const fetchData = async () => {
      try {
        const userResponse = await axios.post("http://localhost:8000/api/v1/users/detail");
        const mentorResponse = await axios.get("http://localhost:8000/api/v1/mentors");
        
        if (userResponse.data.code === 200) {
          setUserInfo(userResponse.data.info);
        }
        
        if (mentorResponse.data.code === 200) {
          // Assuming API response contains the mentors in myMentors and savedMentors arrays
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
    // Implement the logic to edit user profile
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
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Avatar src={userInfo.avatar} size={128} />
          <Button onClick={handleEditClick} icon={<EditOutlined />} />
        </Col>
        <Col span={16}>
          <h2>{userInfo.name}</h2>
          <p>School: {userInfo.school}</p>
          <p>Email: {userInfo.email}</p>
          <p>Student ID: {userInfo.studentId}</p>
          <p>Phone: {userInfo.number}</p>
          <p>Description: {userInfo.description}</p>
        </Col>
      </Row>

      <h2>Mentor của tôi</h2>
      <Row gutter={[16, 16]}>
        {myMentors.map((mentor) => (
          <Col key={mentor._id} span={12}>
            <Card
              title={mentor.name}
              extra={<img src={mentor.companyLogo} alt="Company Logo" />}
              cover={<img alt="avatar" src={mentor.avatar} />}
              actions={[
                // truong slug de the hien su rieng le cua moi mentor (giong id)
                <Button onClick={() => navigate(`/mentors/${mentor.slug}`)}>View more</Button>,
                <Button onClick={() => navigate(`/mentors/${mentor.slug}/review`)}>My Review</Button>,
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

      <h2>Mentor đã lưu</h2>
      <Row gutter={[16, 16]}>
        {savedMentors.map((mentor) => (
          <Col key={mentor._id} span={12}>
            <Card
              title={mentor.name}
              extra={<img src={mentor.companyLogo} alt="Company Logo" />}
              cover={<img alt="avatar" src={mentor.avatar} />}
              actions={[
                <Button onClick={() => navigate(`/mentors/${mentor.slug}`)}>View more</Button>,
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
    </div>
  );
}

export default InfoUser;

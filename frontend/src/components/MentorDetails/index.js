import { Button, Col, Input, List, Modal, notification, Rate, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import ApplyModal from "../ApplyModal";
import RatingModal from "../RatingModal";
import "./MentorDetailPage.css";
import { API } from "../../constant";

function MentorDetailPage() {
  const { id } = useParams(); // Get the mentor's ID from the URL
  const [mentor, setMentor] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(["token", "avatar", "name"]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isMentorSaved, setIsMentorSaved] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!cookies.token);
    
    // Set user avatar and name from cookies
    setUserAvatar(cookies.avatar || "default-avatar-url"); // fallback to default avatar if not available
    setUserName(cookies.name || "User Name"); // fallback to "User Name" if not available

    // Fetch mentor details
    axios
      .post(API + `/api/v1/mentors/detail/${id}`)
      .then((response) => {
        const { mentor, code } = response.data;
        if (code === 200 && mentor.length > 0) {
          setMentor(mentor[0]); // mentor is returned as an array, take the first element
          setComments(mentor[0].review || []); // Assuming `review` contains the comments
        } else {
          console.error("No mentor data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching mentor details:", error);
      });

    // Check if this mentor is already in the user's list
    if (cookies.token) {
      axios
        .get(API + `/api/v1/users/mentors`)
        .then((response) => {
          const savedMentors = response.data || [];
          setIsMentorSaved(savedMentors.some((mentor) => mentor._id === id));
        })
        .catch((error) => {
          console.error("Error checking saved mentors:", error);
        });
    }
  }, [id, cookies.token, cookies.avatar, cookies.name]);

  // Toggle comment modal
  const handleToggleCommentModal = () => {
    setCommentModalVisible(!commentModalVisible);
  };

  // Handle comment submission
  const handleSubmitComment = () => {
    if (!newComment) return;

    axios
      .post(API + `/api/v1/mentors/${id}/comment`,
        { message: newComment },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      )
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewComment("");
        setCommentModalVisible(false);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  // Handle "Apply Now" button click
  const handleApplyNow = () => {
    if (!isLoggedIn) {
      notification.warning({
        message: "You need to log in",
        description: "Please log in to apply for this mentor.",
      });
      return;
    }

    if (!isMentorSaved) {
      setApplyModalVisible(true);
    } else {
      navigate("/my-mentor");
    }
  };

  // Handle "Save" button click
  const handleSaveMentor = () => {
    if (!isLoggedIn) {
      notification.warning({
        message: "You need to log in",
        description: "Please log in to save this mentor.",
      });
      return;
    }

    if (!isMentorSaved) {
      axios
        .post(API + `/api/v1/users/mentors/save`,
          { mentorId: id },
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
          }
        )
        .then((response) => {
          notification.success({
            message: "Mentor Saved",
            description: "The mentor has been saved to your list.",
          });
          setIsMentorSaved(true);
        })
        .catch((error) => {
          console.error("Error saving mentor:", error);
        });
    } else {
      navigate("/my-mentor");
    }
  };

  // Handle "My Review" button click
  const handleMyReview = () => {
    setReviewModalVisible(true);
  };

  // Handle "Rate" button click
  const handleRate = () => {
    setRatingModalVisible(true);
  };

  return (
    <div className="mentor-detail-container">
      <div className="mentor-detail-header">
        <h1>{mentor.name}</h1>
        <Rate disabled value={mentor.rate} />
        <p>({mentor.numberRate} đánh giá)</p>
      </div>

      <Row className="mentor-detail-content">
        <Col span={7}>
          <div className="mentor-detail-image">
            <img src={mentor.avatar} alt="mentor-image" />
          </div>
          <div className="action-buttons">
            {isMentorSaved ? (
              <>
                <Button onClick={handleMyReview}>My Review</Button>
                <Button onClick={handleRate}>Rate</Button>
              </>
            ) : (
              <>
                <Button onClick={handleApplyNow} className="mentor-detail-btn">
                  Apply Now
                </Button>
                <Button
                  onClick={handleSaveMentor}
                  className="mentor-detail-btn"
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </Col>
        <Col span={17}>
          <div className="mentor-detail-profile">
            <h3>Giới thiệu</h3>
            <p>{mentor.introduction1}</p>

            <h3>Lĩnh vực hoạt động</h3>
            <p>{mentor.industry}</p>

            <h3>Hồ sơ công tác và kinh nghiệm hoạt động</h3>
            <p>{mentor.experience}</p>
          </div>

          <div className="mentor-detail-review">
            <h3>Review</h3>
            <Row className="mentor-detail-comment">
              <Col xxl={3} xl={4} className="user-comment">
                <div className="user-avatar-comment">
                  <img src={userAvatar} alt="user-avatar" />
                </div>
                <h4>{userName}</h4>
              </Col>
              <Col xxl={21} xl={20}>
                <Input disabled className="user-comment-input" />
              </Col>
            </Row>
            <Button onClick={handleToggleCommentModal} type="link">
              Full
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Reviews"
        visible={commentModalVisible}
        onCancel={handleToggleCommentModal}
        className="mentor-detail-modal"
        footer={false}
      >
        <List
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta description={item.message} />
              <div>{new Date(item.createAt).toLocaleDateString()}</div>
            </List.Item>
          )}
        />
        {isLoggedIn ? (
          <Row>
            <Col span={2}>
              <div className="review-user-avatar">
                <img src={userAvatar} alt="user-avatar" />
              </div>
            </Col>
            <Col span={22} className="review-newComment">
              <Input.TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your review"
                style={{ overflow: "hidden" }}
              />
              <button
                className="review-submit-btn"
                onClick={handleSubmitComment}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="send-icon"
                >
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </Col>
          </Row>
        ) : (
          <p>Please log in to leave a review.</p>
        )}
      </Modal>

      {/* Apply and Rating Modals */}
      <ApplyModal
        visible={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
        mentor={mentor}
      />
      <RatingModal
        visible={ratingModalVisible}
        onCancel={() => setRatingModalVisible(false)}
        mentor={mentor}
      />
    </div>
  );
}

export default MentorDetailPage;

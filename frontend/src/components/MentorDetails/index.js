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
  const [cookies] = useCookies(["token"]);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isMentorSaved, setIsMentorSaved] = useState(false);
  const [isMyMentor, setIsMyMentor] = useState(false);
  const [userAvatar, setUserAvatar] = useState("default-avatar-url"); // Default avatar
  const [userName, setUserName] = useState("User Name"); // Default name
  const [loading, setLoading] = useState(false); //loading btn
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!cookies.token);

    if (cookies.token) {
      // Fetch user details
      axios
        .get(API + `/api/v1/users/detail`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((response) => {
          const userData = response.data.info;
          // console.log(userData);

          setUserAvatar(userData.avatar || "default-avatar-url"); // Fallback to default avatar
          setUserName(userData.name || "User Name"); // Fallback to "User Name"

          const savedMentors = response.data.info.saveMentorIds || [];
          setIsMentorSaved(
            savedMentors.some((mentor) => mentor.mentorId === id)
          );
          const MyMentor = response.data.info.mentorIds || [];
          setIsMyMentor(MyMentor.some((mentor) => mentor.mentorId === id));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }

    // Fetch mentor details
    axios
      .post(API + `/api/v1/mentors/detail/${id}`)
      .then((response) => {
        const { mentor, code } = response.data;
        console.log(mentor);
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
  }, [id, cookies.token]);

  // Toggle comment modal
  const handleToggleCommentModal = () => {
    setCommentModalVisible(!commentModalVisible);
  };

  // Handle comment submission
  const handleSubmitComment = async () => {
    // Check if newComment is empty or undefined before proceeding
    if (!newComment) return;
    try {
      // Use await with axios.post to handle the asynchronous operation
      const response = await axios.post(
        `${API}/api/v1/users/reviewMentor/${id}`, // Ensuring that API and id are defined correctly
        { review: newComment },
        {
          headers: { Authorization: `Bearer ${cookies.token}` }, // Make sure cookies.token is correctly set
        }
      );
      // Update the comments state with the new comment
      setComments(response.data.mentor.review);
      setNewComment(""); // Clear the input field
      setCommentModalVisible(false); // Hide the modal
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error submitting comment:", error);
    }
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
    console.log(isMentorSaved);

    if (isMentorSaved) {
      setApplyModalVisible(true);
    } else {
      navigate("/my-mentor");
    }
  };

  // Handle "Save" button click

  const handleSave = async () => {
    if (!cookies.token) {
      notification.error({
        message: "Yêu cầu đăng nhập",
        description: "Bạn cần đăng nhập để lưu mentor.",
      });
      return;
    }

    setLoading(true); // Set loading to true when the button is clicked

    try {
      const response = await axios.post(
        API + `/api/v1/users/updateSave`,
        { saveMentorId: mentor._id },
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );

      if (response.data.code === 200) {
        notification.success({
          message: "Lưu mentor thành công",
          description: `Mentor ${mentor.name} đã được lưu.`,
        });
        setIsMentorSaved(true);
      } else {
        notification.error({
          message: "Lưu mentor thất bại",
          description: "Đã xảy ra lỗi khi lưu mentor. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lưu mentor thất bại",
        description: "Đã xảy ra lỗi khi lưu mentor. Vui lòng thử lại sau.",
      });
      console.error("Error saving mentor:", error);
    } finally {
      setLoading(false); // Reset loading to false after the request is complete
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

  const buttonCheck = () => {
    if (isMyMentor) {
      return (
        <>
          {/* <Button onClick={handleMyReview} className="mentor-detail-btn">
            My Review
          </Button> */}
          <Button onClick={handleRate} className="mentor-detail-btn">
            Rate
          </Button>
        </>
      );
    } else if (isMentorSaved) {
      return (
        <Button onClick={handleApplyNow} className="mentor-detail-btn">
          Apply Now
        </Button>
      );
    } else {
      return (
        <>
          <Button onClick={handleApplyNow} className="mentor-detail-btn">
            Apply Now
          </Button>
          <Button
            onClick={handleSave}
            className="mentor-detail-btn"
            loading={loading}
          >
            Save
          </Button>
        </>
      );
    }
  };
  const handleSubmitRating = async (numberRating) => {
    try {
      const response = await axios.post(
        API + `/api/v1/users/rateMentor/${id}`,
        { rate: numberRating },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // Include the Bearer token in the header
          },
        }
      );
      // Handle success (e.g., show a success message or update UI)
      window.location.href = `/mentors/detail/${id}`;
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="mentor-detail-container">
      <div className="mentor-detail-header">
        <h1>{mentor.name}</h1>
        <Rate disabled value={mentor.rate} />
        <p>({mentor.numberRate || 0} đánh giá)</p>
      </div>

      <Row className="mentor-detail-content">
        <Col span={7}>
          <div className="mentor-detail-image">
            <img src={mentor.avatar} alt="mentor-image" />
          </div>
          <div className="action-buttons">{buttonCheck()}</div>
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
          <p>Please log in to post a comment</p>
        )}
      </Modal>

      <ApplyModal
        open={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
        mentorId={mentor._id}
      />

      <RatingModal
        visible={ratingModalVisible}
        onClose={() => {
          setRatingModalVisible(false);
        }}
        mentorId={mentor._id}
        handleSubmitRating={handleSubmitRating}
      />
    </div>
  );
}

export default MentorDetailPage;

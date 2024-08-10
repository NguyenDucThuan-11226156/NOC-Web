import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button, Modal, Input, List, Rate, notification } from 'antd';
import axios from 'axios';
import ApplyModal from '../ApplyModal'; 
// import ReviewModal from './ReviewModal'; // not yet supported 
import RatingModal from '../RatingModal'; 
import './MentorDetailPage.css';

function MentorDetailPage() {
  const { id } = useParams(); // Get the mentor's ID from the URL
  const [mentor, setMentor] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(['token']);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isMentorSaved, setIsMentorSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!cookies.token);

    // Fetch mentor details
    axios.get(`/api/v1/mentors/${id}`)
      .then(response => {
        setMentor(response.data);
        setComments(response.data.review || []); // Assuming `review` contains the comments
      })
      .catch(error => {
        console.error('Error fetching mentor details:', error);
      });

    // Check if this mentor is already in the user's list
    if (cookies.token) {
      axios.get(`/api/v1/users/mentors`)
        .then(response => {
          const savedMentors = response.data || [];
          setIsMentorSaved(savedMentors.some(mentor => mentor._id === id));
        })
        .catch(error => {
          console.error('Error checking saved mentors:', error);
        });
    }
  }, [id, cookies.token]);

  // Toggle comment modal
  const handleToggleCommentModal = () => {
    setCommentModalVisible(!commentModalVisible);
  };

  // Handle comment submission
  const handleSubmitComment = () => {
    if (!newComment) return;

    axios.post(`/api/v1/mentors/${id}/comment`, { message: newComment }, {
      headers: { Authorization: `Bearer ${cookies.token}` }
    })
    .then(response => {
      setComments(prev => [...prev, response.data]);
      setNewComment('');
      setCommentModalVisible(false);
    })
    .catch(error => {
      console.error('Error submitting comment:', error);
    });
  };

  // Handle "Apply Now" button click
  const handleApplyNow = () => {
    if (!isLoggedIn) {
      notification.warning({
        message: 'You need to log in',
        description: 'Please log in to apply for this mentor.',
      });
      return;
    }
    
    if (!isMentorSaved) {
      setApplyModalVisible(true);
    } else {
      navigate('/my-mentor');
    }
    // setApplyModalVisible(true); //for debug --- completed
    // console.log("click apply now");
    
  };

  // Handle "Save" button click
  const handleSaveMentor = () => {
    if (!isLoggedIn) {
      notification.warning({
        message: 'You need to log in',
        description: 'Please log in to save this mentor.',
      });
      return;
    }

    if (!isMentorSaved) {
      axios.post(`/api/v1/users/mentors/save`, { mentorId: id }, {
        headers: { Authorization: `Bearer ${cookies.token}` }
      })
      .then(response => {
        notification.success({
          message: 'Mentor Saved',
          description: 'The mentor has been saved to your list.',
        });
        setIsMentorSaved(true);
      })
      .catch(error => {
        console.error('Error saving mentor:', error);
      });
    } else {
      navigate('/my-mentor');
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
      <h1>{mentor.name}</h1>
      <Rate disabled value={mentor.rate} />
      <p>{mentor.numberRate} đánh giá</p>

      <h3>Giới thiệu</h3>
      <p>{mentor.introduction1}</p>

      <h3>Lĩnh vực hoạt động</h3>
      <p>{mentor.field}</p>

      <h3>Hồ sơ công tác và kinh nghiệm hoạt động</h3>
      <p>{mentor.experience}</p>

      <h3>Review</h3>
      <Button onClick={handleToggleCommentModal} type='link'>See full</Button>

      <div className="action-buttons">
        {isMentorSaved ? (
          <>
            <Button onClick={handleMyReview}>My Review</Button>
            <Button onClick={handleRate}>Rate</Button>
          </>
        ) : (
          <>
            <Button onClick={handleApplyNow}>Apply Now</Button>
            <Button onClick={handleSaveMentor}>Save</Button>
          </>
        )}
      </div>

      <Modal
        title="Comments"
        visible={commentModalVisible}
        onCancel={handleToggleCommentModal}
        footer={[
          <Button key="back" onClick={handleToggleCommentModal}>
            Close
          </Button>,
          isLoggedIn && (
            <Button key="submit" type="primary" onClick={handleSubmitComment}>
              Submit Comment
            </Button>
          )
        ]}
      >
        <List
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                description={item.message}
              />
              <div>{new Date(item.createAt).toLocaleDateString()}</div>
            </List.Item>
          )}
        />
        {isLoggedIn ? (
          <Input.TextArea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Enter your comment..."
          />
        ) : (
          <p>Please log in to leave a comment.</p>
        )}
      </Modal>

      <ApplyModal
        open={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
      />
      {/* <ReviewModal
        visible={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
      /> */}
      <RatingModal
        visible={ratingModalVisible}
        onCancel={() => setRatingModalVisible(false)}
      />
    </div>
  );
}

export default MentorDetailPage;
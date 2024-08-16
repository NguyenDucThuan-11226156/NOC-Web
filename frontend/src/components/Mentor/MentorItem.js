import React, { useState, useEffect } from 'react';
import { Card, Rate, Button, Row, Col, notification } from 'antd';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mentor.css';
import ApplyModal from '../ApplyModal';
import { API } from '../../constant';

function MentorItem({ mentor }) {
  const [applyStatus, setApplyStatus] = useState(false);
  const [isMentorSaved, setIsMentorSaved] = useState(false);
  const [isMentorApplied, setIsMentorApplied] = useState(false);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMentorStatus = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get(API + `/api/v1/users/detail`, {
            headers: { Authorization: `Bearer ${cookies.token}` },
          });
          const { infoMentors, saveInfoMentors } = response.data;

          const isSaved = saveInfoMentors.some(
            (savedMentor) => savedMentor._id === mentor._id
          );
          const isApplied = infoMentors.some(
            (appliedMentor) => appliedMentor._id === mentor._id
          );

          setIsMentorSaved(isSaved);
          setIsMentorApplied(isApplied);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    checkMentorStatus();
  }, [cookies.token, mentor._id]);

  const handleApply = () => {
    if (!cookies.token) {
      notification.error({
        message: 'Yêu cầu đăng nhập',
        description: 'Bạn cần đăng nhập để có thể apply.',
      });
      return;
    }
    setApplyStatus(!applyStatus);
  };

  const handleCancel = () => {
    setApplyStatus(false);
  };

  const handleSave = async () => {
    if (!cookies.token) {
      notification.error({
        message: 'Yêu cầu đăng nhập',
        description: 'Bạn cần đăng nhập để lưu mentor.',
      });
      return;
    }

    try {
      const response = await axios.post(
        API + `/api/v1/users/update`,
        { saveMentorId: mentor._id },
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );

      if (response.data.code === 200) {
        notification.success({
          message: 'Lưu mentor thành công',
          description: `Mentor ${mentor.name} đã được lưu.`,
        });
        setIsMentorSaved(true);
      } else {
        notification.error({
          message: 'Lưu mentor thất bại',
          description: 'Đã xảy ra lỗi khi lưu mentor. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lưu mentor thất bại',
        description: 'Đã xảy ra lỗi khi lưu mentor. Vui lòng thử lại sau.',
      });
      console.error('Error saving mentor:', error);
    }
  };

  const handleViewMore = () => {
    if (!cookies.token) {
      notification.error({
        message: 'Yêu cầu đăng nhập',
        description: 'Bạn cần đăng nhập để xem chi tiết mentor.',
      });
      return;
    }

    navigate(`/mentors/detail/${mentor._id}`);
  };

  return (
    <Card bordered className='mentorCard'>
      <Row>
        <Col span={10} className='mentorCard-image'>
          <img
            src={mentor.avatar}
            alt="Avatar"
          />
        </Col>
        <Col span={13} className='mentorCard-content'>
          <h3>{mentor.name}</h3>
          <div className='mentorCard-content-logo'>
            <img src={mentor.companyLogo} alt='Company logo' style={{width: '100%', height:'100%', objectFit: 'cover'}}/>
          </div>
          <p className='mentorCard-content-menteeCount'>Mentee: {mentor.menteeCount}</p>
          <p className='mentorCard-content-introduction'>Mục giới thiệu 1: {mentor.introduction1}</p>
          <p className='mentorCard-content-introduction'>Mục giới thiệu 2: {mentor.introduction2}</p>
          <Rate className='mentorCard-content-rate' disabled defaultValue={mentor.rate} />
          <p className='mentorCard-content-rateCount'>({mentor.numberRate} đánh giá) ({mentor.rate}/5)</p>
          {!isMentorApplied && (
            <Button className='mentorCard-content-Btn' onClick={handleApply}>Apply now</Button>
          )}
          <ApplyModal open={applyStatus} onCancel={handleCancel} />
          <Button className='mentorCard-content-Btn' onClick={handleViewMore}>View more</Button>
          {!isMentorSaved && !isMentorApplied && (
            <Button className='mentorCard-content-Btn' onClick={handleSave}>Save</Button>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default MentorItem;

import React, { useState } from 'react';
import { Card, Rate, Button, Row, Col, notification } from 'antd';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mentor.css';
import ApplyModal from '../ApplyModal'; // Adjust the import path if necessary

function MentorItem({ mentor }) {
  const [applyStatus, setApplyStatus] = useState(false);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

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
        'http://localhost:8000/api/v1/mentors/save', 
        { mentorId: mentor._id }, 
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );

      if (response.data.code === 200) {
        notification.success({
          message: 'Lưu mentor thành công',
          description: `Mentor ${mentor.name} đã được lưu.`,
        });
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
            style={{ width: '100%', height: '100%', objectFit: 'cover'}}
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
          <Button className='mentorCard-content-Btn' onClick={handleApply}>Apply now</Button>
          <ApplyModal open={applyStatus} onCancel={handleCancel} />
          <Button className='mentorCard-content-Btn' onClick={handleViewMore}>View more</Button>
          <Button className='mentorCard-content-Btn' onClick={handleSave}>Save</Button>
        </Col>
      </Row>
    </Card>
  );
}

export default MentorItem;

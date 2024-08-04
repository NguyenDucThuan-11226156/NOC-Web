import React from 'react';
import { Card, Rate, Button, Row, Col } from 'antd';
import './Mentor.css'

function MentorItem({ mentor }) {
    return (
        <Card bordered className='mentorCard'>
            <Row>
                <Col span={10} className='mentorCard-image'>
                    <img
                        src={mentor.avatar} // Assuming avatar URL is stored in mentor.avatar
                        alt="Avatar"
                        style={{ width: '100%', height: 'auto'}}
                    />
                </Col>
                <Col span={13} className='mentorCard-content'>
                    <h3>{mentor.name}</h3>
                    <div className='mentorCard-content-logo'>
                        Logo công ty
                    </div>
                    <p className='mentorCard-content-menteeCount'>Mentee: {mentor.menteeCount}</p>
                    <p className='mentorCard-content-introduction'>Mục giới thiệu 1: {mentor.introduction1}</p>
                    <p className='mentorCard-content-introduction'>Mục giới thiệu 2: {mentor.introduction2}</p>
                    <Rate className='mentorCard-content-rate' disabled defaultValue={mentor.rate} />
                    <p className='mentorCard-content-rateCount'>({mentor.numberRate} đánh giá) ({mentor.rate}/5)</p>
                    <Button className='mentorCard-content-Btn' >Apply now</Button>
                    <Button className='mentorCard-content-Btn' style={{background: '#fff', color:'rgba(54, 103, 172, 1)'}}>View more</Button>
                    <Button className='mentorCard-content-Btn' style={{background: '#fff', color:'rgba(54, 103, 172, 1)'}}>Save</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default MentorItem;

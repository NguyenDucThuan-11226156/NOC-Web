import React from 'react';
import { Card, Rate, Button, Row, Col } from 'antd';

function MentorItem({ mentor }) {
    return (
        <Card bordered={false} style={{ width: 300 }}>
            <Row>
                <Col span={8}>
                    <img
                        src={mentor.avatar} // Assuming avatar URL is stored in mentor.avatar
                        alt="Avatar"
                        style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                    />
                </Col>
                <Col span={16}>
                    <h3>{mentor.name}</h3>
                    <p>Mentee: {mentor.menteeCount}</p>
                    <p>Mục giới thiệu 1: {mentor.introduction1}</p>
                    <p>Mục giới thiệu 2: {mentor.introduction2}</p>
                    <Rate disabled defaultValue={mentor.rate} />
                    <p>({mentor.numberRate} đánh giá) ({mentor.rate}/5)</p>
                    <Button type="primary" style={{ marginRight: 8 }}>Apply now</Button>
                    <Button type="default" style={{ marginRight: 8 }}>View more</Button>
                    <Button type="default">Save</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default MentorItem;


import { Row, Col} from 'antd';
import MentorItem from './MentorItem';



function Mentor({ mentors }) {
    return (
        <Row gutter={[16, 16]} justify="center">
            {mentors.map((mentor) => (
                <Col span={8} key={mentor.id}>
                    <MentorItem mentor={mentor} />
                </Col>
            ))}
        </Row>
    );
}

export default Mentor;

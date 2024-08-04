
import { Row, Col} from 'antd';
import MentorItem from './MentorItem';



function Mentor({ mentors }) {
    return (
        <Row gutter={[16, 16]} justify="center">
            {mentors.map((mentor) => (
                <Col xxl={10} key={mentor.id} className='mentorCol'>
                    <MentorItem mentor={mentor} />
                </Col>
            ))}
        </Row>
    );
}

export default Mentor;

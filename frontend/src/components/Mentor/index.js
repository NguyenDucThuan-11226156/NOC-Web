import { Row, Col } from "antd";
import MentorItem from "./MentorItem";

function Mentor({ mentors }) {
  return (
    <Row gutter={[0, 30]} justify="center">
      {mentors.map((mentor) => (
        <Col xxl={11} xl={11} lg={24} key={mentor.id} className="mentorCol">
          <MentorItem mentor={mentor} mentorId={mentor.id} />
        </Col>
      ))}
    </Row>
  );
}

export default Mentor;

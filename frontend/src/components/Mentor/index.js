import { Row, Col, Skeleton } from "antd";
import MentorItem from "./MentorItem";

function Mentor({ mentors, loading }) {
  return (
    <Row gutter={[0, 30]} justify="center">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Col xxl={11} xl={11} lg={24} key={index} className="mentorCol">
              <Skeleton active paragraph={{ rows: 3 }} />
            </Col>
          ))
        : mentors.map((mentor) => (
            <Col xxl={11} xl={11} lg={24} key={mentor.id} className="mentorCol">
              <MentorItem mentor={mentor} mentorId={mentor.id} />
            </Col>
          ))}
    </Row>
  );
}

export default Mentor;
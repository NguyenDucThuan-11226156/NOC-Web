import React, { useState, useEffect, useRef } from "react";
import { Card, Carousel, notification } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import MentorItem from "../Mentor/MentorItem";
import { postMentorList } from "../../services/mentorsServices";
import "./PinnedMentor.css";

const PinnedMentor = () => {
  const [pinnedMentors, setPinnedMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchPinnedMentors();

    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 1200 ? 1 : 2);
    };
    handleResize(); // Initial call to set slides based on current width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPinnedMentors = async () => {
    setLoading(true);
    try {
      const result = await postMentorList({ limit: 10, page: 1 });
      setPinnedMentors(result.pinnedMentor);
    } catch (error) {
      notification.error({
        message: "Failed to load pinned mentors. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <Card
      title="Mentor nổi bật"
      loading={loading}
      className="pinned-mentor-card"
    >
      <div className="carousel-wrapper">
        <LeftOutlined
          className="carousel-arrow left-arrow"
          onClick={handlePrev}
        />
        <Carousel
          autoplay
          className="pinned-mentor-carousel"
          ref={carouselRef}
          slidesToShow={slidesToShow}
        >
          {pinnedMentors.map((mentor, index) => (
            <div key={index} className="carousel-item">
              <MentorItem mentor={mentor} />
            </div>
          ))}
        </Carousel>
        <RightOutlined
          className="carousel-arrow right-arrow"
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default PinnedMentor;

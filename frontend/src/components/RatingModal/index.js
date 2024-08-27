import { useState } from "react";
import { Modal, Rate } from "antd";
import "./RatingModal.css";
const RatingModal = ({ visible, onClose, handleSubmitRating }) => {
  const [rating, setRating] = useState(5); // Default rating value
  // Handle rating change
  const onRateChange = (value) => {
    setRating(value);
  };
  return (
    <Modal
      title="RATE"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="rating-modal"
    >
      <p className="rating-subtitle">NEU DAILY MENTORING</p>
      <div className="rating-content">
        <Rate
          allowHalf
          defaultValue={rating}
          onChange={onRateChange} // Capture rating value
          className="rating-star"
        />
        <div className="rating-score">({rating}/5)</div>{" "}
        {/* Display selected rating */}
        <button
          className="rating-submit-btn"
          onClick={() => handleSubmitRating(rating)} // Pass the rating value on submit
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="send-icon"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;

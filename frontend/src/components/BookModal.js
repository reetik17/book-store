import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import apiConstants from "../constants/apiConstants";
import "./styles/BookModal.scss";

Modal.setAppElement("#root");

const BookModal = ({ book, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${apiConstants.BASE_URL}api/v1/books/${book._id}/reviews`
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [book._id]);

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(
        `${apiConstants.BASE_URL}api/v1/books/${book._id}/reviews`,
        {
          rating,
          feedback,
        }
      );
      setReviews([...reviews, response.data.review]);
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Modal
      isOpen={book}
      onRequestClose={onClose}
      contentLabel="Book Details"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>{book.name}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>

      <h3>Reviews</h3>
      <ol className="review-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <p>
              <strong>{index + 1}: Rating-</strong> {review.rating} / 5
            </p>
            <p>{review.feedback}</p>
          </li>
        ))}
      </ol>

      <h3>Add a Review</h3>
      <div className="review-form">
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <label>
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>
        <button onClick={handleSubmitReview}>Submit Review</button>
      </div>

      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default BookModal;

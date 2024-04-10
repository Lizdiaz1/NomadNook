import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";

const ReviewFormModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);
	const [permaStars, setPermaStars] = useState(0)
	const [errors, setErrors] = useState({});
	const history = useNavigate();
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		const payload = {
			review: reviewText,
			stars,
		};
		e.preventDefault();
		setErrors({});

		let createdReview = await dispatch(postReview(spotId, payload)).catch(
			async (res) => {
				const data = await res.json();

				if (data && data.message) setErrors({ message: data.message });

				alert(data.message);
			}
		);

		if (createdReview) {
			closeModal();
		}
		return history(`/spots/${spotId}`);
	};

	const handleDisabled = (review, stars) => {
		if (review.length < 10 || stars < 1) {
			return true;
		}

		return false;
	};

	const handleStars = (num) => {
		return setStars(num);
	};

	const handlePerma = (num) => {
		return setPermaStars(num)
	}



	return (
		<>
			{errors && <p>{errors.message}</p>}
			<h1>How was your stay?</h1>
			<form className="review-form" onSubmit={handleSubmit}>
				<label className="review-textarea">
					<textarea
						className="review-textarea"
						rows="6"
						placeholder="Leave your review here..."
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
						required
					/>
				</label>
				<label className="stars">
					<span
						className={stars >= 1 ? "filled" : "empty"}
						onMouseOver={() => handleStars(1)}
						onMouseOut={() => handleStars(permaStars)}
						onClick={() => handlePerma(1)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 2 ? "filled" : "empty"}
						onMouseOver={() => handleStars(2)}
						onMouseOut={() => handleStars(permaStars)}
						onClick={() => handlePerma(2)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 3 ? "filled" : "empty"}
						onMouseOver={() => handleStars(3)}
						onMouseOut={() => handleStars(permaStars)}
						onClick={() => handlePerma(3)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 4 ? "filled" : "empty"}
						onMouseOver={() => handleStars(4)}
						onMouseOut={() => handleStars(permaStars)}
						onClick={() => handlePerma(4)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars === 5 ? "filled" : "empty"}
						onMouseOver={() => handleStars(5)}
						onMouseOut={() => handleStars(permaStars)}
						onClick={() => handlePerma(5)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					Stars
				</label>

				<button
					className="review-button"
					type="submit"
					disabled={handleDisabled(reviewText, stars)}
				>
					Submit Your Review
				</button>
			</form>
		</>
	);
};

export default ReviewFormModal;

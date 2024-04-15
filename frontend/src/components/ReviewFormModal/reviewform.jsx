import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css?inline";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";
import { FaStar } from 'react-icons/fa';
//import { getSpots } from "../../store/spots";

const ReviewFormModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);
	const [permaStars, setPermaStars] = useState(0);
	const [errors, setErrors] = useState({});
	const history = useNavigate();
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const payload = {
			review: reviewText,
			stars,
		};

		let createdReview = await dispatch(postReview(spotId, payload)).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.message) setErrors({ message: data.message });
				alert(data.message);
			}
		);

		if (createdReview) {
			closeModal();
			history(`/spots/${spotId}`);
		}
	};

	const handleStars = (num) => setStars(num);
	const handlePerma = (num) => setPermaStars(num);

	return (
		<>
			{errors && <p>{errors.message}</p>}
			<h1>How was your stay?</h1>
			<form className="review-form" onSubmit={handleSubmit}>
				<textarea
					className="review-textarea"
					rows="6"
					placeholder="Leave your review here..."
					value={reviewText}
					onChange={(e) => setReviewText(e.target.value)}
					required
				/>
				<div className="stars">
					{[...Array(5)].map((_, i) => (
						<span
							key={i + 1}
							className={stars > i ? "filled" : "empty"}
							onMouseEnter={() => handleStars(i + 1)}
							onMouseLeave={() => handleStars(permaStars)}
							onClick={() => handlePerma(i + 1)}
							onKeyDown={(e) => e.key === 'Enter' && handlePerma(i + 1)}
							tabIndex={0}
							role="button"
							aria-label={`Rate ${i + 1} out of 5 stars`}
						>
							<FaStar />
						</span>
					))}
				</div>
				<button
					className="review-button"
					type="submit"
					disabled={reviewText.length < 10 || stars < 1}
				>
					Submit Your Review
				</button>
			</form>
		</>
	);
};

export default ReviewFormModal;

import { useState } from "react";
import { useDispatch } from "react-redux";
import "./DeleteReviewModal.css";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";

const DeleteReviewModal = ({ reviewId }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	//console.log(reviewId);

	const handleAgree = (e) => {
		e.preventDefault();
		setErrors({});
		dispatch(deleteReview(reviewId))
			.then(() => closeModal())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message) setErrors({ message: data.message });
				//console.log(data)
				alert(data.message);
			});
	};

	const handleDisagree = (e) => {
		e.preventDefault();
		return closeModal();
	};

	return (
		<>
			<h1>Confirm Delete</h1>
			<form className="delete-form" onSubmit={(e) => e.preventDefault}>
				{errors && <p>{errors.message}</p>}
				<h2>Are you sure you want to delete this review?</h2>
				<button className="yes-delete" type="submit" onClick={handleAgree}>
					Yes(Delete Review)
				</button>
				<button onClick={handleDisagree} className="dont-delete" type="submit">
					No(Keep Review)
				</button>
			</form>
		</>
	);
};

export default DeleteReviewModal;

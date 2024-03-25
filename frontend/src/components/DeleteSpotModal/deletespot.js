import { useState } from "react";
import { useDispatch } from "react-redux";
import "./ConfirmDelete.css";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/userSpot";

const DeleteSpotModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	//console.log(spotId);

	const handleAgree = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(deleteSpot(spotId))
			.then(closeModal)
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
				<h2>Are you sure you want to remove this spot from the listings?</h2>
				<button className="yes-delete" type="submit" onClick={handleAgree}>
					Yes(Delete Spot)
				</button>
				<button onClick={handleDisagree} className="dont-delete" type="submit">
					No(Keep Spot)
				</button>
			</form>
		</>
	);
};

export default DeleteSpotModal;

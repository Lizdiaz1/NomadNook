import "./UpdateSpot.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spot";
import { updateExistingSpot } from "../../store/spots";

const UpdateSpot = () => {
	const dispatch = useDispatch();
	const history = useNavigate();
	const spot = history.location.state?.prop1;
	const { spotId } = useParams();


    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId]);


let currImg1, currImg2, currImg3, currImg4;

if (spot.SpotImages) {
    if (spot.SpotImages[1]) {
        currImg1 = spot.SpotImages[1].url;
    }
    if (spot.SpotImages[2]) {
        currImg2 = spot.SpotImages[2].url;
    }
    if (spot.SpotImages[3]) {
        currImg3 = spot.SpotImages[3].url;
    }
    if (spot.SpotImages[4]) {
        currImg4 = spot.SpotImages[4].url;
    }
}



	const [country, setCountry] = useState(spot.country);
	const [address, setAddress] = useState(spot.address);
	const [city, setCity] = useState(spot.city);
	const [state, setState] = useState(spot.state);
	const [lat, setLat] = useState(spot.lat);
	const [lng, setLng] = useState(spot.lng);
	const [description, setDescription] = useState(spot.description);
	const [title, setTitle] = useState(spot.name);
	const [price, setPrice] = useState(spot.price);
	const [previewImg, setPreviewImg] = useState(spot.previewImage);
	const [imageOne, setImageOne] = useState(currImg1 || "");
	const [imageTwo, setImageTwo] = useState(currImg2 || "");
	const [imageThree, setImageThree] = useState(currImg3 || "");
	const [imageFour, setImageFour] = useState(currImg4 || "");
	const [errors, setErrors] = useState({});
	const [imgErrors, setImageErrors] = useState({});
	const [createClick, setCreateClick] = useState(false);


	const payload = {
		address,
		city,
		country,
		description,
		lat,
		lng,
		name: title,
		price,
		state,
	};

	const imgPayload = [previewImg, imageOne, imageTwo, imageThree, imageFour];

	for (let i = 0; i < imgPayload.length; i++) {
		let currImg = imgPayload[i];
		imgPayload[i] = { url: currImg, spotId: spotId, preview: false };
		imgPayload[0].preview = true;


	}

	const handleDisable = (array) => {
		let res;

		for (let i = 0; i < array.length; i++) {
			let currImg = array[i];

			if (currImg.url) {
				if (
					currImg.url.toString().endsWith(".png") ||
					currImg.url.toString().endsWith(".jpg") ||
					currImg.url.toString().endsWith(".jpeg")
				) {

					res = false;
				} else {

					res = true;
					break;
				}
			}
		}

		return res;
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		setCreateClick(true);

		return dispatch(updateExistingSpot(payload, spotId)).then(
			() => {
				return history.push(`/spots/${spotId}`);
			},
			async (res) => {
				const data = await res.json();

				if (data) {
					if (data.message) {
						setErrors({ message: data.message });
						alert(data.message);
					}
					if (data.errors instanceof Object) {
						const derrors = data.errors;
						//console.log(derrors, "form errors");
						if (derrors) {
							setErrors({
								...errors,
								address: derrors.address,
								city: derrors.city,
								country: derrors.country,
								description: derrors.description,
								name: derrors.name,
								price: derrors.price,
								state: derrors.state,
								lat: derrors.lat,
								lng: derrors.lng,
							});
						}
					}

					if (typeof data.errors === typeof "string") {
						alert(data.errors);
					}
				}
			}
		);
	};

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        const isImageValid = /\.(jpg|jpeg|png)$/i.test(value);

        if (!isImageValid) {
            setImageErrors(prevErrors => ({
                ...prevErrors,
                [name]: "Image URL must end in .png, .jpg, or .jpeg",
            }));
        } else {

            switch (name) {
                case "previewImg":
                    setPreviewImg(value);
                    break;
                case "imageOne":
                    setImageOne(value);
                    break;
                case "imageTwo":
                    setImageTwo(value);
                    break;
                case "imageThree":
                    setImageThree(value);
                    break;
                case "imageFour":
                    setImageFour(value);
                    break;
                default:
                    break;
            }

            setImageErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

	return (
		<>
			<div className="headers">
				<h1>Update your Spot</h1>
				<h2>Where is your place located?</h2>
				<p>
					Guests will only get your exact address once the booked a reservation.
				</p>
			</div>
			<form className="newSpotForm" onSubmit={handleSubmit}>
				<div className="location-form">
					{errors.country && <p className="rr">{errors.country}</p>}
					<label>
						Country
						<input
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></input>
					</label>
					{errors.address && <p className="rr">{errors.address}</p>}
					<label>
						Street Address
						<input
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></input>
					</label>

					<span className="cityState-form">
						{errors.city && <p className="rr">{errors.city}</p>}
						<label>
							City
							<input
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							></input>
						</label>

						{errors.state && <p className="rr">{errors.state}</p>}
						<label>
							State
							<input
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
							></input>
						</label>
					</span>
					<span className="latLong-form">
						{errors.lat && <p className="rr">{errors.lat}</p>}
						<label>
							Latitude
							<input
								placeholder="Latitude"
								value={lat}
								onChange={(e) => setLat(e.target.value)}
							></input>
							,
						</label>

						{errors.lng && <p className="rr">{errors.lng}</p>}
						<label>
							Longitude
							<input
								placeholder="Longitude"
								value={lng}
								onChange={(e) => setLng(e.target.value)}
							></input>
						</label>
					</span>
				</div>

				<div className="description-form">
					<div className="description-headers">
						<h2>Describe your place to guests</h2>
						<p>
							Make sure to mention some of the best features of your place, are there any special amenities, like fast wifi, or parking, and what you love about the neighborhood.
						</p>
					</div>
					{errors.description && <p className="rr">{errors.description}</p>}
					<textarea
						className="descriptionText-form"
						rows={10}
						placeholder="Please write at least 30 character description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>

				<div className="title-form">
					<div className="title-headers">
						<h2>Create a title for you spot</h2>
						<p>
							Catch the attention of the guest with a spot title that highlights what makes your place so special.
						</p>
						{errors.name && <p className="rr">{errors.name}</p>}
						<input
							placeholder="Name of your spot"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
				</div>

				<div className="price-form">
					<div className="price-headers">
						<h2>Set a base price for your spot</h2>
						<p>
							Competitive pricing helps your listing stand out and will help you rank higher in the search results.
						</p>
					</div>
					{errors.price && <p className="rr">{errors.price}</p>}
					<span className="dollar-sign">
						$
						<input
							placeholder="Price per night(USD)"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						></input>
					</span>
				</div>

				<div className="photos-form">
					<div className="photos-headers">
						<h2>Let us add some photos to bring live to your place</h2>
						<p>Submit a link to at least one photo to publish your spot.</p>
					</div>

				{<input
						placeholder="Preview image URL"
						value={previewImg}
						onChange={(e) => setPreviewImg(e.target.value)}
					></input>
                } {createClick && handleDisable(previewImg) ? (
                        <p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
                    ) : null}

					<input
						placeholder="Image URL"
						value={imageOne}
                        onChange={handleImageChange} // Use this for handling changes
                        />
                        {imgErrors.imageFour && <p className="error">{imgErrors.imageOne}</p>}
{/*
					></input>
					{createClick && handleDisable([imageOne]) ? (
                        <p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
                    ) : null} */}

					<input
						placeholder="Image URL"
						value={imageTwo}
                        onChange={handleImageChange} // Use this for handling changes
                        />
                        {imgErrors.imageTwo && <p className="error">{imgErrors.imageTwo}</p>}
{/*
					// ></input>
					// {createClick && handleDisable([imageTwo]) ? (
                    //     <p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
                    // ) : null} */}

					<input
						placeholder="Image URL"
						value={[imageThree]}
                        onChange={handleImageChange} // Use this for handling changes
                        />
                        {imgErrors.imageThree && <p className="error">{imgErrors.imageThree}</p>}

					{/* // ></input>
					// {createClick && handleDisable([imageThree]) ? (
                    //     <p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
                    // ) : null} */}

					<input
						placeholder="Image URL"
						value={imageFour}
                        onChange={handleImageChange} // Use this for handling changes
                        />
                        {imgErrors.imageFour && <p className="error">{imgErrors.imageFour}</p>}
					{/* ></input>
					{createClick && handleDisable([imageFour]) ? (
                        <p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
                    ) : null} */}
				</div>

				<div className="submitButton-form">
					<button

						className="createSpotButton-form"
						disabled={handleDisable(imgPayload)}
					>
						Update your Spot
					</button>
				</div>
                </form>
		</>
	);
};

export default UpdateSpot;

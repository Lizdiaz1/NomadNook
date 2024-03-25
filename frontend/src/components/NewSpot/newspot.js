import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewSpot } from "../../store/spots.js";
import { addImage } from "../../store/images";
import { getSpots } from "../../store/spots.js"

const NewSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // State hooks for form inputs
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [imageOne, setImageOne] = useState("");
    const [imageTwo, setImageTwo] = useState("");
    const [imageThree, setImageThree] = useState("");
    const [imageFour, setImageFour] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const validateImageURL = (url) => {
        return url.match(/\.(jpeg|jpg|png)$/) != null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidImage = [previewImg, imageOne, imageTwo, imageThree, imageFour].every(img => validateImageURL(img) || img === "");

        if (!isValidImage) {
            setErrors({ ...errors, images: "All image URLs must end in .png, .jpg, or .jpeg" });
            return;
        }

        const payload = {
            country,
            address,
            city,
            state,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            description,
            name: title,
            price: parseFloat(price),
        };

        const imgPayload = [previewImg, imageOne, imageTwo, imageThree, imageFour]
            .filter(url => url && validateImageURL(url))
            .map((url, index) => ({ url, preview: index === 0 }));

        try {
            const createdSpot = await dispatch(createNewSpot(payload)).unwrap();
            const spotId = createdSpot.id;

            await Promise.all(
                imgPayload.map(img => dispatch(addImage({ ...img, spotId })).unwrap())
            );

            history.push(`/spots/${spotId}`);
        } catch (error) {
            setErrors(error.data.errors || { general: "An error occurred. Please try again." });
        }
    };

    const renderErrors = () => {
        return Object.keys(errors).map((key, i) => (
            <div key={i} className="error">
                {errors[key]}
            </div>
        ));
    };

    return (
        <div className="new-spot-container">
            <h1>Create a New Spot</h1>
            {renderErrors()}
            <form onSubmit={handleSubmit} className="newSpotForm">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

            {/* country input */}
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>

            {/* Address Input */}
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                {errors.address && <p className="error">{errors.address}</p>}
            </div>

            {/* City Input */}
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                {errors.city && <p className="error">{errors.city}</p>}
            </div>

            {/* State Input */}
            <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                {errors.state && <p className="error">{errors.state}</p>}
            </div>

            {/* Latitude Input */}
            <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                <input
                    id="lat"
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
                {errors.lat && <p className="error">{errors.lat}</p>}
            </div>

            {/* Longitude Input */}
            <div className="form-group">
                <label htmlFor="lng">Longitude</label>
                <input
                    id="lng"
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                />
                {errors.lng && <p className="error">{errors.lng}</p>}
            </div>

            {/* Price Input */}
            <div className="form-group">
                <label htmlFor="price">Price per Night</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                />
                {errors.price && <p className="error">{errors.price}</p>}
            </div>

                {/* Input for previewImg with validation */}
                <div className="form-group">
                    <label htmlFor="previewImg">Preview Image URL</label>
                    <input
                        id="previewImg"
                        type="text"
                        value={previewImg}
                        onChange={(e) => setPreviewImg(e.target.value)}
                        required
                    />
                    {!validateImageURL(previewImg) && <p className="error">Preview image URL must end in .png, .jpg, or .jpeg</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="imageOne">Additional Image URL 1</label>
                    <input
                        id="imageOne"
                        type="text"
                        value={imageOne}
                        onChange={(e) => setImageOne(e.target.value)}
                    />
                    {imageOne && !validateImageURL(imageOne) && <p className="error">Image URL must end in .png, .jpg, or .jpeg</p>}
                </div>

                            {/* ImageTwo Input */}
            <div className="form-group">
                <label htmlFor="imageTwo">Additional Image URL 2</label>
                <input
                    id="imageTwo"
                    type="text"
                    value={imageTwo}
                    onChange={(e) => setImageTwo(e.target.value)}
                />
                {imageTwo && !validateImageURL(imageTwo) && <p className="error">Image URL must end in .png, .jpg, or .jpeg</p>}
            </div>

            {/* ImageThree Input */}
            <div className="form-group">
                <label htmlFor="imageThree">Additional Image URL 3</label>
                <input
                    id="imageThree"
                    type="text"
                    value={imageThree}
                    onChange={(e) => setImageThree(e.target.value)}
                />
                {imageThree && !validateImageURL(imageThree) && <p className="error">Image URL must end in .png, .jpg, or .jpeg</p>}
            </div>

            {/* ImageFour Input */}
            <div className="form-group">
                <label htmlFor="imageFour">Additional Image URL 4</label>
                <input
                    id="imageFour"
                    type="text"
                    value={imageFour}
                    onChange={(e) => setImageFour(e.target.value)}
                />
                {imageFour && !validateImageURL(imageFour) && <p className="error">Image URL must end in .png, .jpg, or .jpeg</p>}
            </div>

                <div className="form-group">
                    <button type="submit" disabled={!validateImageURL(previewImg)}>Create Spot</button>
                </div>
            </form>
            {Object.keys(errors).length > 0 && (
                <div className="errors-container">
                    {Object.entries(errors).map(([key, value]) => (
                        <p key={key} className="error">{value}</p>
                    ))}
                </div>
            )}
        </div>
    );

                    }

export default NewSpot;

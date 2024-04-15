import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageSpots.css?inline";
import { getUserSpots } from "../../store/userSpot";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";

function ManageSpots () {
    const dispatch = useDispatch();
    const history = useNavigate();

    const spots = useSelector((state) => {
        return state.userSpots.userList.map((spotId) => state.userSpots[spotId]);
    });

    useEffect(() => {
        dispatch(getUserSpots());
    }, [dispatch]);

    const handleNewSpot = () => {
        history.push("/spots/new");
    };

    const handleUpdate = (spot) => {
        history.push(`/spots/${spot.id}/edit`);
    };

    const getDecimal = (num) => {
        return num > 0 ? (Math.round(num * 100) / 100).toFixed(1) : 0;
    };

    return (
        <>
            <div className="outer-div-manage">
                <h1 className="manage-spots-header">Manage Your Spots</h1>
                <nav>
                    {spots.length ? (
                        [...spots].reverse().map((spot) => (
                            <div key={spot.id} className="all-spots">
                                <NavLink to={`/spots/${spot.id}`}>
                                    <div className="thumbnail-container">
                                        <img
                                            src={`${spot.previewImage}`}
                                            alt="Spot Preview Image"
                                            className="thumbnail-image"
                                            title={`${spot.name}`}
                                        />
                                        <div className="thumbnail-info">
                                            <div className="secondary-text">
                                                {spot.avgRating == 0 ? (
                                                    <>
                                                        <div className="address-text">{`${spot.city}, ${spot.state}`}</div>
                                                        <div className="star-text">
                                                            <i className="fa-solid fa-star"></i> New
                                                        </div>
                                                        <div className="price-text">
                                                            <b>${spot.price}</b> night
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="address-text">{`${spot.city}, ${spot.state}`}</div>
                                                        <div className="star-text">
                                                            <i className="fa-solid fa-star"></i> {getDecimal(spot.avgRating)}
                                                        </div>
                                                        <div className="price-text">
                                                            <b>${spot.price}</b> night
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                                <div className="update-delete-container">
                                    <span className="update-delete-buttons">
                                        <button className="update" onClick={() => handleUpdate(spot)}>Update</button>
                                        <OpenModalButton
                                            className="delete-button"
                                            buttonText="Delete"
                                            modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                        />
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <button onClick={handleNewSpot}>Create New Spot</button>
                    )}
                </nav>
            </div>
        </>
    );
}

export default ManageSpots;

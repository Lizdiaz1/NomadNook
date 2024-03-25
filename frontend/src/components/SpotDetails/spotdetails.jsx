// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getOne } from "../../store/spot";
// import { getReviews } from "../../store/reviews";
// import "./SpotDetails.css";
// import OpenModalButton from "../OpenModalButton";
// import ReviewFormModal from "../ReviewFormModal";
// import DeleteReviewModal from "../DeleteReviewModal";

// const SpotDetails = () => {
// 	const dispatch = useDispatch();

// 	let { spotId } = useParams();
// 	//console.log(spotId, "spotId use params");
// 	//console.log(useParams());

// 	const [avgStars, setAvgStars] = useState(0);

// 	useEffect(() => {
//         dispatch(getOne(spotId));
//         dispatch(getReviews(spotId));
//     }, [dispatch, spotId]);

// 	useEffect(() => {
// 		let final = 0;
// 		let total = 0;
// 		for (let i = 0; i < Reviews.length; i++) {
// 			const currReview = Reviews[i];
// 			total += currReview.stars;
// 			//console.log(currReview)
// 		}

// 		if (total > 0) {
// 			final = parseFloat(total / Reviews.length).toFixed(2);
// 			final = (Math.round(final * 100) / 100).toFixed(2);
// 		}


// 		//console.log(final, 'total', total)
// 		setAvgStars(final);
//         }, [Reviews]);
// 	};

// 	//console.log(owner, "owner");

// 	const Spot = useSelector((state) => {
// 		return state.spot;
// 	});

// 	//console.log(Spot, "spot");

// 	const user = useSelector((state) => {
// 		//console.log(state.session, "session slice of state aka user variable");
// 		return state.session.user;
// 	});
// 	// useEffect(() => {
// 	//     setReviews(Reviews)
// 	//     console.log(reviews, "reviews")
// 	// }, [Spot] )

// 	const Reviews = useSelector((state) => {
// 		//console.log(state, "entire state in side Reviews");
// 		if (state.reviews.list.message) {
// 			return [];
// 		}
// 		return state.reviews.list.map((spotId) => state.reviews[spotId]);
// 	});

// 	if (Reviews) {
// 		for (let i = 0; i < Reviews.length; i++) {
// 			let currReview = Reviews[i];
// 			if (currReview === undefined) {
// 				let deadArr = Reviews.splice(i, 1);
// 			}
// 		}
// 	}

// 	//console.log(Reviews, "Reviews");

// 	//console.log(Spot, "spot")

// 	if (!Reviews.length) {
// 		//console.log("no reviews");
// 	}

// 	let content = null;

// 	let numReviews = null;

// 	const reviewDate = (element) => {
// 		const arr = element.split("-");
// 		const year = arr[0];
// 		const month = arr[1];

// 		const monthNames = [
// 			"January",
// 			"February",
// 			"March",
// 			"April",
// 			"May",
// 			"June",
// 			"July",
// 			"August",
// 			"September",
// 			"October",
// 			"November",
// 			"December",
// 		];
// 		const longMonth = monthNames[month - 1];

// 		const date = `${longMonth} ${year}`;
// 		return date;
// 	};
// 	if (Reviews[0]) {
// 		//console.log(reviewDate(Reviews[0].createdAt));
// 	}
// 	if (Reviews.length === 1) {
// 		numReviews = <b>{Reviews.length} review</b>;
// 	}

// 	if (Reviews.length > 1) {
// 		numReviews = <b>{Reviews.length} reviews</b>;
// 	}

// 	let owner;

// 	if (Spot.Owner) {
// 		owner = Spot.Owner[0];
// 	}
// 	let isOwner = false;
// 	if (user && Spot.Owner) {
// 		//console.log(user.id, "user");
// 		const isOwnerFunc = () => {
// 			if (user.id === Spot.Owner[0].id) {
// 				return true;
// 			} else return false;
// 		};
// 		isOwner = isOwnerFunc();
// 	}

// 	let hasReview = false;

// 	const hasReviewFunc = () => {
// 		if (Reviews.length) {
// 			for (let i = 0; i < Reviews.length; i++) {
// 				let currReview = Reviews[i];
// 				//console.log(currReview, "currReview");
// 				if (user) {
// 					if (currReview) {
// 						if (user.id === currReview.userId) {
// 							//console.log("you have a review");
// 							return true;
// 						}
// 					}
// 				}
// 			}
// 		}
// 		return false;
// 	};

// 	hasReview = hasReviewFunc();

// 	let spotImages = {}


// 	if (Spot.SpotImages) {
// 		for (let i = 1; i < Spot.SpotImages.length ; i++) {
// 			let currImg = Spot.SpotImages[i]
// 			if (currImg.url !== '') {
// 				spotImages[i] = currImg.url
// 			}
// 		}
// 	}

// 	//console.log(Spot.Owner[0].id, "owner")

// 	content = (
// 		<div className="Spot-detail-lists">
// 			<div>
// 				<h1 id="spotName">{Spot.name}</h1>
// 				<h2 id="spotLocation">
// 					{Spot.city}, {Spot.state}, {Spot.country}
// 				</h2>
// 				<div className="image-container">
// 					<img
// 						className="previewImg"
// 						src={
// 							Spot.SpotImages
// 								? Spot.SpotImages[0]
// 									? Spot.SpotImages[0].url
// 									: Spot.city
// 								: Spot.city
// 						}
// 						alt="preview"
// 					></img>

// 					{spotImages[1] ? (
// 						<img src={spotImages[1]} id="prev1" alt="small-img"></img>
// 					) : (
// 						<></>
// 					)}
// 					{spotImages[2] ? (
// 						<img src={spotImages[2]} id="prev2" alt="small-img"></img>
// 					) : (
// 						<></>
// 					)}
// 					{spotImages[3] ? (
// 						<img src={spotImages[3]} id="prev3" alt="small-img"></img>
// 					) : (
// 						<></>
// 					)}
// 					{spotImages[4] ? (
// 						<img src={spotImages[4]} id="prev4" alt="small-img"></img>
// 					) : (
// 						<></>
// 					)}
// 				</div>
// 				<div className="under-images">
// 					<div id="hosted-by">
// 						<h2>
// 							<b>Hosted by </b>
// 							{"  "}
// 							{owner === undefined ? "Loading" : owner.firstName}{" "}
// 							{owner === undefined ? "Loading" : owner.lastName}
// 						</h2>
// 						<br></br>
// 						<div className="description-p">
// 							<p> {Spot.description} </p>
// 						</div>

// 						<br></br>
// 					</div>
// 					<span className="reservation-area">
// 						<b id="price">${Spot.price}</b> night
// 						<i className="fa-solid fa-star"></i>
// 						{avgStars === 0 || !avgStars ? "New" : `${avgStars} ·`}
// 						<span className="center-dot"></span>
// 						{numReviews}
// 						<div>
// 							<button
// 								className="reserve-button"
// 								onClick={() => alert("Feature coming soon")}
// 							>
// 								Reserve
// 							</button>
// 						</div>
// 					</span>
// 				</div>

// 				<div className="reviews-header">
// 					<h2>
// 						<i className="fa-solid fa-star"></i>
// 						{avgStars === 0 || !avgStars ? "New " : `${avgStars} ·`}
// 						{numReviews}
// 						<div className="post-review-button">
// 							{user && !hasReview && !isOwner ? (
// 								<OpenModalButton
// 									className={"review-spot-button"}
// 									buttonText="Post Your Review"
// 									modalComponent={<ReviewFormModal spotId={spotId} />}
// 								/>
// 							) : (
// 								<span></span>
// 							)}
// 						</div>
// 						<span className="center-dot"></span>
// 					</h2>
// 				</div>
// 				<div className="reviews-container">
// 					{Reviews.length !== 0 ? (
// 						Reviews.toReversed().map((element) => {
// 							return (
// 								<div className="reviews">
// 									{" "}
// 									<div className="reviewer-name">
// 										<b>{element.User.firstName}</b>
// 									</div>
// 									<div className="review-date">
// 										{reviewDate(element.createdAt)}
// 									</div>
// 									<div className="review">
// 										{element.review}
// 										{element && user ? (
// 											element.userId === user.id ? (
// 												<div>
// 													<OpenModalButton
// 														className="delete-review-button"
// 														buttonText="Delete"
// 														modalComponent={
// 															<DeleteReviewModal reviewId={element.id} />
// 														}
// 													/>
// 												</div>
// 											) : (
// 												<></>
// 											)
// 										) : (
// 											<></>
// 										)}
// 									</div>
// 								</div>
// 							);
// 						})
// 					) : (
// 						<>
// 							<span className="reviews-header">
// 								Be the first to leave a review!
// 							</span>{" "}
// 						</>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);

// 	return (
//         <div className="spot-detail">
//             <h1>{spot.name}</h1>
//             {/* Spot details */}
//             <div>{avgStars} Stars ({reviews.length} Reviews)</div>
//             {user && <OpenModalButton modalComponent={<ReviewFormModal spotId={spotId} />} />}
//             {renderReviews()}
//         </div>
//     );

// export default SpotDetails;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOne as getOneSpot } from "../../store/spot";
import { getReviews as getReviewsForSpot } from "../../store/reviews";
import "./SpotDetails.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/reviewform";
import DeleteReviewModal from "../DeleteReviewModal/deletereview";
//import { NavLink } from "react-router-dom";


const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [avgStars, setAvgStars] = useState(0);
  const spot = useSelector((state) => state.spot.currentSpot);
  const user = useSelector((state) => state.session.user);
  const Reviews = useSelector((state) => Object.values(state.reviews.byId));
  //const [setSpots] = useState([]);



  // Fetch spot and reviews data when component mounts or spotId changes
  useEffect(() => {
    if (spotId) {
        // Fetch data for a single spot
        dispatch(getOneSpot(spotId));
        dispatch(getReviewsForSpot(spotId));
      } //else {
        // Fetch data for all spots for the listing view
        //dispatch(fetchAllSpots()).then(setSpots);
      //}
    }, [dispatch, spotId]);

  // Calculate average stars when Reviews update
  useEffect(() => {
    if (Reviews.length > 0) {
      const totalStars = Reviews.reduce((acc, review) => acc + review.stars, 0);
      const averageStars = (totalStars / Reviews.length).toFixed(2);
      setAvgStars(parseFloat(averageStars)); // Ensure avgStars is a number
    }
  }, [Reviews]);

  // Determine if the current user is the spot owner
  const isOwner = user && spot?.ownerId === user.id;

  // Determine if the current user has already reviewed the spot
  const hasReview = Reviews.some((review) => review.userId === user?.id);

  // Render the spot details
//   if (spotId) {
//   return (
//     <div className="spot-details">
//       <h1>{spot?.name}</h1>
//       <p>{spot?.description}</p>
//       <div className="spot-meta">
//         <span>{spot?.city}, {spot?.state}, {spot?.country}</span>
//         <span>Price per night: ${spot?.price}</span>
//         <span>Average Rating: {avgStars || 'New'} ({Reviews.length} reviews)</span>
//       </div>
//       {isOwner && <p>You own this spot!</p>}
//       {!isOwner && user && !hasReview && (
//         <OpenModalButton buttonText="Write a Review" modalComponent={<ReviewFormModal spotId={spotId} />} />
//       )}
//       <div className="reviews">
//         {Reviews.map((review) => (
//           <div key={review.id} className="review">
//             <p>{review.user?.name}: {review.content}</p>
//             {user?.id === review.userId && (
//               <DeleteReviewModal reviewId={review.id} />
//             )}
//           </div>
//         ))}
//       </div>
//     {}
//     else {
//       <div className="spots-list">
//         {spot.map((spot) => (
//           <NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-tile">
//             <img src={spot.previewImage} alt={spot.name} />
//             <div className="spot-info">
//               <p>{spot.city}, {spot.state}</p>
//               <p>⭐ {spot.avgRating ? spot.avgRating : 'New'}</p>
//               <p>${spot.price} / night</p>
//             </div>
//           </NavLink>
//         ))}
//       </div>
//   } </div>
//   );
// } }

return (
    <div className="spot-details">
      <h1>{spot?.name}</h1>
      <p>{spot?.description}</p>
      <div className="spot-meta">
        <span>{spot?.city}, {spot?.state}, {spot?.country}</span>
        <span>Price per night: ${spot?.price}</span>
        <span>Average Rating: {avgStars || 'New'} ({Reviews.length} reviews)</span>
      </div>
      {isOwner && <p>You own this spot!</p>}
      {!isOwner && user && !hasReview && (
        <OpenModalButton buttonText="Write a Review" modalComponent={<ReviewFormModal spotId={spotId} />} />
      )}
      <div className="reviews">
        {Reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.user?.name}: {review.content}</p>
            {user?.id === review.userId && (
              <DeleteReviewModal reviewId={review.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
            }
export default SpotDetails;

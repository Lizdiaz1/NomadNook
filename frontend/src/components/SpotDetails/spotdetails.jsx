import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { getReviews as getReviewsForSpot } from "../../store/reviews";
import "./SpotDetails.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/reviewform";
import DeleteReviewModal from "../DeleteReviewModal/deletereview";
//import { NavLink } from "react-router-dom";
import { calculateAverageRating, formatPrice } from "../../utils/numbers";

function SpotDetails () {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot.currentSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.byId));
  const [avgStars, setAvgStars] = useState(0);

  useEffect(() => {
    if (spotId) {
      dispatch(getOneSpot(spotId));
      dispatch(getReviewsForSpot(spotId));
    }
  }, [dispatch, spotId]);

  useEffect(() => {
    if (reviews.length > 0) {
      const averageStars = calculateAverageRating(reviews);
      setAvgStars(averageStars);
    }
  }, [reviews]);

  const isOwner = user && spot?.ownerId === user.id;
  const hasReview = reviews.some((review) => review.userId === user?.id);

  return (
    <div className={"spotDetails"}>
      <h1>{spot?.name}</h1>
      <p>{spot?.description}</p>
      <div className={"spotMeta"}>
        <span>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
        <span>Price per night: {formatPrice(spot?.price)}</span>
        <span>Average Rating: {avgStars || 'New'} ({reviews.length} reviews)</span>
      </div>
      {isOwner && <p>You own this spot!</p>}
      {!isOwner && user && !hasReview && (
        <OpenModalButton buttonText="Write a Review" modalComponent={<ReviewFormModal spotId={spotId} />} />
      )}
      <ul className={reviews}>
        {reviews.map((review) => (
          <li key={review.id} className={review}>
            <p>{review.user?.name}: {review.content}</p>
            {user?.id === review.userId && (
              <DeleteReviewModal reviewId={review.id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpotDetails;

// function SpotDetails () {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();
//   const [avgStars, setAvgStars] = useState(0);
//   const spot = useSelector((state) => state.spot.currentSpot);
//   const user = useSelector((state) => state.session.user);
//   const Reviews = useSelector((state) => Object.values(state.reviews.byId));
//   //const [setSpots] = useState([]);



//   // Fetch spot and reviews data when component mounts or spotId changes
//   useEffect(() => {
//     if (spotId) {
//         // Fetch data for a single spot
//         dispatch(getOneSpot(spotId));
//         dispatch(getReviewsForSpot(spotId));
//       } //else {
//         // Fetch data for all spots for the listing view
//         //dispatch(fetchAllSpots()).then(setSpots);
//       //}
//     }, [dispatch, spotId]);

//   // Calculate average stars when Reviews update
//   useEffect(() => {
//     if (Reviews.length > 0) {
//       const totalStars = Reviews.reduce((acc, review) => acc + review.stars, 0);
//       const averageStars = (totalStars / Reviews.length).toFixed(2);
//       setAvgStars(parseFloat(averageStars)); // Ensure avgStars is a number
//     }
//   }, [Reviews]);

//   // Determine if the current user is the spot owner
//   const isOwner = user && spot?.ownerId === user.id;

//   // Determine if the current user has already reviewed the spot
//   const hasReview = Reviews.some((review) => review.userId === user?.id);

//   // Render the spot details
// //   if (spotId) {
// //   return (
// //     <div className="spot-details">
// //       <h1>{spot?.name}</h1>
// //       <p>{spot?.description}</p>
// //       <div className="spot-meta">
// //         <span>{spot?.city}, {spot?.state}, {spot?.country}</span>
// //         <span>Price per night: ${spot?.price}</span>
// //         <span>Average Rating: {avgStars || 'New'} ({Reviews.length} reviews)</span>
// //       </div>
// //       {isOwner && <p>You own this spot!</p>}
// //       {!isOwner && user && !hasReview && (
// //         <OpenModalButton buttonText="Write a Review" modalComponent={<ReviewFormModal spotId={spotId} />} />
// //       )}
// //       <div className="reviews">
// //         {Reviews.map((review) => (
// //           <div key={review.id} className="review">
// //             <p>{review.user?.name}: {review.content}</p>
// //             {user?.id === review.userId && (
// //               <DeleteReviewModal reviewId={review.id} />
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     {}
// //     else {
// //       <div className="spots-list">
// //         {spot.map((spot) => (
// //           <NavLink to={`/spots/${spot.id}`} key={spot.id} className="spot-tile">
// //             <img src={spot.previewImage} alt={spot.name} />
// //             <div className="spot-info">
// //               <p>{spot.city}, {spot.state}</p>
// //               <p>⭐ {spot.avgRating ? spot.avgRating : 'New'}</p>
// //               <p>${spot.price} / night</p>
// //             </div>
// //           </NavLink>
// //         ))}
// //       </div>
// //   } </div>
// //   );
// // } }

// return (
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
//     </div>
//   );
//             }
// export default SpotDetails;

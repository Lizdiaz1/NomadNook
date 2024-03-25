import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creators
const load = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const remove = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunk Actions
export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const { Reviews } = await response.json();
    dispatch(load(Reviews));
  }
};

export const postReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    dispatch(getReviews(spotId));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(remove(reviewId));
  }
};

// Initial State
const initialState = {
  byId: {},
  list: [],
};

// Reducer
const ReviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REVIEWS: {
        // Creating a new block scope for this case
        const byId = {};
        action.reviews.forEach((review) => {
          byId[review.id] = review;
        });
        return {
          ...state,
          byId,
          list: action.reviews.map((review) => review.id),
        };
      }
      case DELETE_REVIEW: {
        // Creating a new block scope for this case
        const newState = {
          ...state,
          byId: { ...state.byId },
          list: state.list.filter((id) => id !== action.reviewId),
        };
        delete newState.byId[action.reviewId];
        return newState;
      }
      default:
        return state;
    }
  };


export default ReviewReducer;

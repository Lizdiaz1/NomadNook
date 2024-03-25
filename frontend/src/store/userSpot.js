import { csrfFetch } from "./csrf";

// Action Types
const LOAD_USER_SPOTS = "userSpots/LOAD";
const DELETE_USER_SPOT = "userSpots/DELETE";

// Action Creators
const loadUserSpots = (spots) => ({
  type: LOAD_USER_SPOTS,
  payload: spots,
});

const deleteUserSpot = (spotId) => ({
  type: DELETE_USER_SPOT,
  payload: spotId,
});

// Thunk Actions
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserSpots(data.Spots));
  } else {
    // Handle errors or throw an exception
    console.error("Failed to load user spots");
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, { method: "DELETE" });
  if (response.ok) {
    dispatch(deleteUserSpot(spotId));
  } else {
    // Handle errors or throw an exception
    console.error("Failed to delete spot");
  }
};

// Initial State
const initialState = {
  userSpots: [],
};

// Reducer
const userSpotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
    case DELETE_USER_SPOT:
      return {
        ...state,
        spots: state.spots.filter(spot => spot.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userSpotsReducer;

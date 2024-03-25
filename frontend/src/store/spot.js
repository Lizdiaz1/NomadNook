import { csrfFetch } from "./csrf";

// Action Types
const CREATE_SPOT = "spot/CREATE_SPOT";
const DELETE_SPOT = "spot/DELETE_SPOT";
const GET_ONE_SPOT = "spot/GET_ONE_SPOT";

// Action Creators
const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  payload: spot,
});

const getOneSpotAction = (spot) => ({
  type: GET_ONE_SPOT,
  payload: spot,
});

const removeSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});

// Thunk Action Creators
export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getOneSpotAction(spot));
    return spot;
  }
  throw new Error('Failed to fetch spot details.');
};

export const createNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpotAction(newSpot));
    return newSpot;
  }
  throw new Error('Failed to create new spot.');
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {method: "DELETE"});

  if (response.ok) {
    dispatch(removeSpotAction(spotId));
    return;
  }
  throw new Error('Failed to delete spot.');
};

// Initial state
const initialState = {};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_SPOT:
      return {...state, currentSpot: action.payload};
    case CREATE_SPOT:
      // Adjust logic here if needed to incorporate the new spot into your state
      return state;
    case DELETE_SPOT:
      if (state.currentSpot?.id === action.payload) {
        const newState = {...state, currentSpot: null};
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default spotsReducer;

import { csrfFetch } from "./csrf";

// Action Types
const LOAD = "spots/LOAD";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";

// Action Creators
const load = (list) => ({
  type: LOAD,
  list,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const updatedSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
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
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getOneSpotAction(spot));
    return spot;
  }
  throw new Error("Failed to fetch spot details.");
};

export const createNewSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  }
  throw new Error("Failed to create new spot.");
};

export const updateExistingSpot = (spotData, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData),
  });
  if (response.ok) {
    const updatedSpotData = await response.json();
    dispatch(updatedSpot(updatedSpotData));
    return updatedSpotData;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeSpotAction(spotId));
    return;
  }
  throw new Error("Failed to delete spot.");
};

// Initial State
const initialState = {
  list: [],
  allSpots: {},
  currentSpot: null,
};

// Helper Function for Sorting
const sortList = (list) => {
  return list.sort((a, b) => a.id - b.id).map((spot) => spot.id);
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      if (Array.isArray(action.list.Spots)) {
        const allSpots = {};
        action.list.Spots.forEach((spot) => {
          allSpots[spot.id] = spot;
        });
        return {
          ...state,
          allSpots,
          list: sortList(action.list.Spots),
        };
      } else {
        console.error("Action list is not an array:", action.list);
        return state;
      }
    }

    case CREATE_SPOT: {
      const newSpot = action.spot;
      return {
        ...state,
        allSpots: { ...state.allSpots, [newSpot.id]: newSpot },
        list: sortList([...Object.values(state.allSpots), newSpot]),
      };
    }

    case UPDATE_SPOT: {
      const updatedSpot = action.spot;
      const newAllSpots = { ...state.allSpots, [updatedSpot.id]: updatedSpot };
      return {
        ...state,
        allSpots: newAllSpots,
        list: sortList(Object.values(newAllSpots)),
      };
    }

    case GET_ONE_SPOT:
      return { ...state, currentSpot: action.payload };

    case DELETE_SPOT: {
      // eslint-disable-next-line no-unused-vars
      const { [action.payload]: _, ...remainingSpots } = state.allSpots;
      return {
        ...state,
        allSpots: remainingSpots,
        list: sortList(Object.values(remainingSpots)),
        currentSpot: state.currentSpot?.id === action.payload ? null : state.currentSpot,
      };
    }

    default:
      return state;
  }
};

export default spotsReducer;





// import { csrfFetch } from "./csrf";

// // Action Types
// const LOAD = "spots/LOAD";
// const CREATE_SPOT = "spots/CREATE_SPOT";
// const UPDATE_SPOT = "spots/UPDATE_SPOT";
// const DELETE_SPOT = "spots/DELETE_SPOT";
// const GET_ONE_SPOT = "spots/GET_ONE_SPOT";

// // Action Creators
// const load = (list) => ({
//   type: LOAD,
//   list,
// });

// const createSpot = (spot) => ({
//   type: CREATE_SPOT,
//   spot,
// });

// const updatedSpot = (spot) => ({
//   type: UPDATE_SPOT,
//   spot,
// });

// const getOneSpotAction = (spot) => ({
//   type: GET_ONE_SPOT,
//   payload: spot,
// });

// const removeSpotAction = (spotId) => ({
//   type: DELETE_SPOT,
//   payload: spotId,
// });

// // Thunk Action Creators
// export const getSpots = () => async (dispatch) => {
//   const response = await csrfFetch("/api/spots");
//   if (response.ok) {
//     const list = await response.json();
//     dispatch(load(list));
//   }
// };

// export const getOneSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);
//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(getOneSpotAction(spot));
//     return spot;
//   }
//   throw new Error("Failed to fetch spot details.");
// };

// export const createNewSpot = (spotData) => async (dispatch) => {
//   const response = await csrfFetch("/api/spots", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(spotData),
//   });
//   if (response.ok) {
//     const newSpot = await response.json();
//     dispatch(createSpot(newSpot));
//     return newSpot;
//   }
//   throw new Error("Failed to create new spot.");
// };

// export const updateExistingSpot = (spotData, spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(spotData),
//   });
//   if (response.ok) {
//     const updatedSpotData = await response.json();
//     dispatch(updatedSpot(updatedSpotData));
//     return updatedSpotData;
//   }
// };

// export const deleteSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     dispatch(removeSpotAction(spotId));
//     return;
//   }
//   throw new Error("Failed to delete spot.");
// };

// // Initial State
// const initialState = {
//   list: [],
// };

// // Helper Function for Sorting
// const sortList = (list) => {
//   return list.sort((a, b) => a.id - b.id).map((spot) => spot.id);
// };

// // Reducer
// const spotsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD: {
//       const allSpots = {};
//       if (Array.isArray(action.list)) {
//         action.list.map((spot) => {
//           allSpots[spot.id] = spot;
//         });
//         return {
//           ...state,
//           ...allSpots,
//           list: sortList(action.list),
//         };
//       } else {
//         // Handle the case where action.list is not an array
//         console.error("Action list is not an array:", action.list);
//         return state; // Return the current state as is
//       }
//     }

//     case CREATE_SPOT: {
//       const newState = {
//         ...state,
//         [action.spot.id]: action.spot,
//         list: [...state.list, action.spot.id],
//       };
//       newState.list = sortList(newState.list);
//       return newState;
//     }
//     case UPDATE_SPOT: {
//       const newState = {
//         ...state,
//         [action.spot.id]: action.spot,
//       };
//       newState.list = sortList(Object.values(newState));
//       return newState;
//     }
//     case GET_ONE_SPOT:
//       return { ...state, currentSpot: action.payload };

//     case DELETE_SPOT:
//       if (state.currentSpot?.id === action.payload) {
//         const newState = { ...state, currentSpot: null };
//         return newState;
//       }
//       return state;
//     default:
//       return state;
//   }
// };

// export default spotsReducer;

import { csrfFetch } from "./csrf";

// Action Types
const LOAD = "spots/LOAD";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";

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

// Thunk Action Creators
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
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


// Initial State
const initialState = {
    list: [],
};

// Helper Function for Sorting
const sortList = (list) => {
    return list.sort((a, b) => a.id - b.id).map((spot) => spot.id);
};

// Reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allSpots = {};
            action.list.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            return {
                ...state,
                ...allSpots,
                list: sortList(action.list),
            };
        }
        case CREATE_SPOT: {
            const newState = {
                ...state,
                [action.spot.id]: action.spot,
                list: [...state.list, action.spot.id],
            };
            newState.list = sortList(newState.list);
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = {
                ...state,
                [action.spot.id]: action.spot,
            };
            newState.list = sortList(Object.values(newState));
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;

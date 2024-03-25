import { csrfFetch } from "./csrf";

// Action Types
const UPLOAD_IMAGE = "images/UPLOAD_IMAGE";
const SET_IMAGE_ERROR = "images/SET_IMAGE_ERROR";

// Action Creators
const uploadImage = (image) => ({
    type: UPLOAD_IMAGE,
    image,
});

const setImageError = (error) => ({
    type: SET_IMAGE_ERROR,
    error,
});

// Thunk Action
export const addImage = (spotId, image) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(image),
        });

        if (response.ok) {
            const imageData = await response.json();
            dispatch(uploadImage(imageData));
            return imageData;
        } else {
            // Handle non-OK responses by throwing an error to catch block
            const error = await response.json();
            throw new Error(error.message || "Failed to upload image.");
        }
    } catch (error) {
        dispatch(setImageError(error.toString()));
        throw error; // Rethrow after dispatching so caller knows request failed
    }
};

// Initial State
const initialState = {
    images: [],
    error: null,
};

// Reducer
const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return {
                ...state,
                images: [...state.images, action.image], // Append new image to the list
                error: null, // Clear any previous errors
            };
        case SET_IMAGE_ERROR:
            return {
                ...state,
                error: action.error, // Set error message
            };
        default:
            return state;
    }
};

export default imageReducer;

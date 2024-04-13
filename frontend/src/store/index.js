import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { restoreCSRF, csrfFetch } from "./csrf";
import sessionReducer from "./session";
import SpotsReducer from "./spots";
import ReviewReducer from "./reviews";
import SpotReducer from "./spot";
import UserSpotsReducer from "./userSpot";

const rootReducer = combineReducers({
	// add reducer functions here
	session: sessionReducer,
	spots: SpotsReducer,
	reviews: ReviewReducer,
	spot: SpotReducer,
	userSpots: UserSpotsReducer,
});

let enhancer;

if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

if (process.env.NODE_ENV !== "production") {
    restoreCSRF();

    // These will be set when configureStore is called
    const store = configureStore();
    window.csrfFetch = csrfFetch;
    window.store = store;
}

export default configureStore;

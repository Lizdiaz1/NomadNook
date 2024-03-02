import * as sessionActions from './store/session';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF().then(() => {
    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions; // Attach sessionActions to the window object
  });
} else {
  // This condition seems redundant since you're setting `window.store` in both development and production,
  // which is typically not advisable for production. You might want to remove or adjust this block.
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

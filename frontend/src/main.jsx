import * as sessionActions from './store/session';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF().then(() => {
    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
  });
} else {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ModalProvider>
      <App />
   </ModalProvider>
    </Provider>
  </React.StrictMode>
);

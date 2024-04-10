import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/store';
import * as sessionActions from './store/session';
import { csrfFetch, restoreCSRF } from './store/csrf';
import { Modal, ModalProvider } from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
	<ModalProvider>
		<ReduxProvider store={store}>
			<BrowserRouter>
				<App />
				<Modal />
			</BrowserRouter>
		</ReduxProvider>
	</ModalProvider>
</React.StrictMode>
  );

// function Root() {
// 	return (
// 		<ModalProvider>
// 			<ReduxProvider store={store}>
// 				<BrowserRouter>
// 					<App />
// 					<Modal />
// 				</BrowserRouter>
// 			</ReduxProvider>
// 		</ModalProvider>
// 	);
// }

// const rootElement = document.getElementById('root');
// if (!rootElement) throw new Error('Failed to find the root element');
// const root = ReactDOM.createRoot(rootElement);

// root.render(<Root />);

// export default Root;

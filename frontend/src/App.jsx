import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import { ModalProvider } from './context/ModalContext'; // Ensure you have a ModalProvider
import { Modal } from './components/Modal'; // The modal component that listens to the context

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded ? <Outlet /> : null}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <h1>Welcome!</h1> }, // Home route
      // Removed login and signup routes since you're using modals
    ],
  },
]);

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <Modal /> {/* Ensure the Modal component is included */}
    </ModalProvider>
  );
}

export default App;

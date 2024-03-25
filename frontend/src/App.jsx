import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Router } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import { ModalProvider } from './context/ModalContext';
import { Modal } from './components/Modal';
import AllSpots from './components/AllSpots/allspots';
import SpotDetails from './components/SpotDetails/spotdetails';

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

    ],
  },
]);

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <Modal /> {}
      <AllSpots />
      <Router path="/spots/:spotId" component={SpotDetails} />
    </ModalProvider>
  );
}

export default App;

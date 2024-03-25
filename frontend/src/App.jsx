import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import { ModalProvider } from './context/ModalContext';
import { Modal } from './components/Modal';
import AllSpots from './components/AllSpots/allspots';
import SpotDetails from './components/SpotDetails/spotdetails';
import configureStore from './store';
import { Provider } from 'react-redux';
import UpdateSpot from './components/UpdateSpot/updatespot';
// import userSpots from './components/UserSpots/UserSpots';
import CreateSpot from './components/CreateSpot/CreateSpot';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

const store = configureStore();

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
      { path: '/', element: <AllSpots /> }, // Home route
      { path: 'spots/:spotId', element: <SpotDetails /> }, //Spot Details
      { path: 'spots/:spotId/update', element: <UpdateSpot /> }, // Update Spot
      { path: 'spots/current', element: <userSpots /> }, // Spots owned by current user
      { path: 'spots/new', element: <CreateSpot /> }, // Create a new spot
      { path: 'session/sign-in', element: <SignIn /> }, // Sign in page
      { path: 'session/sign-up', element: <SignUp /> }, // Sign up page
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <RouterProvider router={router}>
          <Modal />
        </RouterProvider>
      </ModalProvider>
    </Provider>
  );
}

export default App;

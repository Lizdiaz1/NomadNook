import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import AllSpots from './components/AllSpots/allspots'; //Landing Page
import SpotDetails from './components/SpotDetails/spotdetails';
import UpdateSpot from './components/UpdateSpot/updatespot';
import NewSpot from './components/NewSpot/newspot';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';

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
      { path: 'spots/new', element: <NewSpot /> }, // Creates a new spot
      { path: 'session/sign-in', element: <LoginFormModal /> }, // Sign in page may not need
      { path: 'session/sign-up', element: <SignupFormModal /> }, // Sign up page may not need
    ],
  },
]);

function App() {
  return (
   <RouterProvider router={router}/>
  );
}

export default App;

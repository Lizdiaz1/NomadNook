import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? <Outlet /> : null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <h1>Welcome!</h1> }, // Home route
      { path: '/login', element: <LoginFormPage /> }, // Login route
      { path: '/signup', element: <SignupFormPage />,}, //Signup route
      { path: '/logout', element: <Navigation />,}, //Logout route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? <Outlet /> : null; // Render children routes when the session user is loaded
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <h1>Welcome!</h1> }, // Home route
      { path: '/login', element: <LoginFormPage /> }, // Login route
      { path: '/signup', element: <SignupFormPage />,}, //Signup route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

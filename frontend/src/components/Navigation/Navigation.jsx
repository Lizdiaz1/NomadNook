import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    // If there's a session user, show profile button
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    // If no session user, show Log In and Sign Up links
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="logo-container">
          <img src="/images/2a8ef5e1-0099-4b36-9628-b2bdaf324a3f.png" alt="Logo" id="logo" />
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          {sessionLinks}
        </div>
      </nav>
    </header>
  );
}

export default Navigation; 

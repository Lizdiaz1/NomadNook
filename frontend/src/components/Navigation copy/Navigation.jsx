import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useModal } from '../../context/Modal';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const { showModal } = useModal();


  let sessionLinks;
  if (sessionUser) {
    // If there's a session user
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <NavLink to="/new-spot">Create a New Spot</NavLink>
      </>
    );
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
      <button onClick={() => showModal(<LoginFormModal />)}>Log In</button> {/* Replace <LoginForm /> with your login form component */}
    <button onClick={() => showModal(<SignupFormModal />)}>Sign Up</button> {/* Replace <SignupForm /> with your signup form component */}

        </div>
      </nav>
    </header>
  );
}

export default Navigation;

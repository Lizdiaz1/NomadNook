import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function ProfileButton({ user, buttonClassName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // This effect only runs if showMenu is true
    if (!showMenu) return;

    const closeMenu = (e) => {
      // Check if the click is outside the ul element
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    navigate('/');
  };

  return (
    <div>
      <button
        className={buttonClassName}
        onClick={toggleMenu}
        aria-label="Toggle profile options"
      >
        <FaUserCircle size={28} />
      </button>
      <ul className={`profile-dropdown ${showMenu ? '' : 'hidden'}`} ref={ulRef} aria-expanded={showMenu}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{`${user.firstName} ${user.lastName}`}</li>
            <li>{user.email}</li>
            <li>
              <Link to="/spots/current">
                <button className='manage-spots-button'>Manage Spots</button>
              </Link>
            </li>
            <li>
              <button className="logout-button" onClick={logout} aria-label="Log out">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonClassName="logIn"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                aria-label="Open login modal"
              />
            </li>
            <li>
              <OpenModalButton
                buttonClassName="signUp"
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                aria-label="Open sign up modal"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;

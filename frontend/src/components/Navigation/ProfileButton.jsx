'use strict';

import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const menuRef = useRef();

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);

    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  return (
    <>
      <button onClick={() => setShowMenu(!showMenu)}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul ref={menuRef}>
          <li>{user.username}</li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

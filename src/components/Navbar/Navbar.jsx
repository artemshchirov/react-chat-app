import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { PAGES } from '../../utils/constants';

import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
    navigate(PAGES.SIGNIN);
  };

  return (
    <div className="navbar">
      <Logo />
      <div className="navbar__user">
        <img
          className="navbar__avatar"
          src={currentUser.photoURL}
          alt="user pic"
        />
        <span className="navbar__name">{currentUser.displayName}</span>
        <Button
          className="navbar__button"
          text="logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar;

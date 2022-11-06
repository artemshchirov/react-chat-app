import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { PAGES } from '../../utils/constants';

import avatar from '../../img/avatar.png';
import './Navbar.scss';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('currentUser: ', currentUser);

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
          alt="profile avatar"
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

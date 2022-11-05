import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import avatar from '../../img/avatar.png';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo />
      <div className="navbar__user">
        <img className="navbar__avatar" src={avatar} alt="profile avatar" />
        <span className="navbar__name">Artem</span>
        <Button className="navbar__button" text="logout" />
      </div>
    </div>
  );
};

export default Navbar;

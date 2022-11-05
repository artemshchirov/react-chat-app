import { useLocation } from 'react-router-dom';

import Logo from '../../components/Logo/Logo';

import { PAGES } from '../../utils/constants';

import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isSignIn = location.pathname === PAGES.SIGNIN;

  return (
    <main className="auth">
      <div className="container auth__container">
        <div className="auth__wrapper">
          <div className="auth__logo">
            <Logo />
            <h1 className="auth__title">ChatApp</h1>
          </div>
          <p className="auth__subtitle">{isSignIn ? 'Login' : 'Register'}</p>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;

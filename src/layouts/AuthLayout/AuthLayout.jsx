import Logo from '../../components/Logo/Logo';

import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
  const isSignIn = 'false';

  return (
    <main className="auth">
      <div className="container auth__container">
        <div className="auth__wrapper">
          <div className="auth__logo">
            <Logo />
          </div>
          <h1 className="auth__title">
            {isSignIn ? 'Glad to see you!' : 'Welcome!'}
          </h1>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;

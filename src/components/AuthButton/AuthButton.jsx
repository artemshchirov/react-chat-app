import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import { PAGES } from '../../utils/constants';

import './AuthButton.scss';

function AuthButton({ onClick, isDisabled = false }) {
  const location = useLocation();
  const isSignIn = location.pathname === PAGES.SIGNIN;
  const loaderButton = false;
  const textButton = isSignIn
    ? loaderButton
      ? 'Sign in...'
      : 'Sign in'
    : loaderButton
    ? 'Sign up...'
    : 'Sign up';

  const question = (
    <div className="auth__question">
      <p className="auth__question-text">
        {isSignIn ? 'Not a member yet?' : 'Already a member?'}
      </p>
      <CustomLink
        className="auth__question-link"
        path={isSignIn ? PAGES.SIGNUP : PAGES.SIGNIN}
      >
        {isSignIn ? 'Sign up here!' : 'Log in here!'}
      </CustomLink>
    </div>
  );

  return (
    <>
      <Button
        text={textButton}
        btnType="submit"
        onClick={onClick}
        className={`button ${
          isDisabled
            ? 'form__submit-button form__submit-button_disabled'
            : 'form__submit-button'
        }`}
        isDisabled={isDisabled}
      />
      {question}
    </>
  );
}

export default AuthButton;

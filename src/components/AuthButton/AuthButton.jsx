import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import './AuthButton.scss';

function AuthButton({ onClick, isDisabled = false }) {
  const isSignIn = false;
  const loaderButton = false;
  const textButton = isSignIn
    ? loaderButton
      ? 'Вход...'
      : 'Войти'
    : loaderButton
    ? 'Регистрация...'
    : 'Зарегистрироваться';

  const question = (
    <div className="auth__question">
      <p className="auth__question-text">
        {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
      </p>
      <Link
        className="auth__question-link"
        to={isSignIn ? 'PAGES.SIGNUP' : 'PAGES.SIGNIN'}
      >
        {isSignIn ? 'Регистрация' : 'Войти'}
      </Link>
    </div>
  );

  return (
    <>
      <Button
        title={textButton}
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

import './Button.scss';

function Button({
  text = '',
  className = '',
  btnType = 'button',
  onClick = (f) => f,
  btnDisabled = false,
}) {
  let finalClassName = 'button';
  if (className) {
    finalClassName += ` ${className} ${btnDisabled ? 'button_disabled' : ''}`;
  }

  return (
    <button
      className={finalClassName}
      type={btnType}
      onClick={onClick}
      disabled={btnDisabled}
    >
      {text}
    </button>
  );
}
export default Button;

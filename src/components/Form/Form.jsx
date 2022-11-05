import './Form.scss';

const Form = ({ className = '', children, onSubmit = (f) => f }) => {
  let finalClassName = 'form';
  if (className) {
    finalClassName += ` ${className}`;
  }

  return (
    <form className={finalClassName} onSubmit={onSubmit} noValidate required>
      <fieldset className="form__fieldset">{children}</fieldset>
    </form>
  );
};

export default Form;

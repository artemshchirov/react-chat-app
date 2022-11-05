import './Form.scss';

const Form = ({ className = '', children, onSubmit }) => {
  let finalClassName = 'form';
  if (className) {
    finalClassName += ` ${className}`;
  }

  return (
    <form className={finalClassName} onSubmit={onSubmit} noValidate required>
      {children}
    </form>
  );
};

export default Form;

import './Label.scss';

const Label = ({ text, name, type = 'text', onInput, isValid, value }) => {
  const isPassword = type === 'password';
  const isFile = type === 'file';

  if (isFile) return <input type="file" />;

  return (
    <label className="label">
      <p className="label__text">{text}</p>
      <input
        className={isValid ? 'label__input' : 'label__input label__input_error'}
        type={type}
        autoComplete={isPassword ? 'off' : undefined}
        placeholder={text.toLowerCase()}
        required
        name={name}
        onInput={onInput}
        value={value}
      />
    </label>
  );
};

export default Label;

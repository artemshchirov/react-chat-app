import addAvatarImg from '../../img/addAvatar.png';

import './Label.scss';

const Label = ({
  text,
  name,
  type,
  onInput = (f) => f,
  isValid = true,
  value,
}) => {
  const isPassword = type === 'password';
  const isFile = type === 'file';

  if (isFile) {
    return (
      <>
        <input style={{ display: 'none' }} type={type} id={type} />
        <label htmlFor="file" className="label label_type_file">
          <img src={addAvatarImg} alt="add avatar image" />
          <span>Add an avatar</span>
        </label>
      </>
    );
  }

  return (
    <label className="label">
      <input
        className={`input ${
          isValid ? 'label__input' : 'label__input label__input_error'
        }`}
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

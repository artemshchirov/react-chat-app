import addAvatarImg from '../../img/addAvatar.png';

import './Label.scss';

const Label = ({
  text,
  name,
  type,
  onChange = (f) => f,
  isValid = true,
  value,
}) => {
  const isPassword = type === 'password';
  const isFile = type === 'file';

  if (isFile) {
    return (
      <>
        <input
          style={{ display: 'none' }}
          name={name}
          type={type}
          id={type}
          onChange={onChange}
        />
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
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default Label;

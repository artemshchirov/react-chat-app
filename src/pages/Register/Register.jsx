import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import Form from '../../components/Form/Form';
import Label from '../../components/Label/Label';

import useFormAndValidation from '../../hooks/useFormAndValidation';
import { VALIDATION_CONFIGS, VALIDATION_PARAMS } from '../../utils/constants';

import './Register.scss';
import Button from '../../components/Button/Button';
import AuthButton from '../../components/AuthButton/AuthButton';

const Register = () => {
  const initValues = { name: '1', email: '2', password: '3' };
  const { values, errors, isValid, handleChange } = useFormAndValidation(
    initValues,
    VALIDATION_CONFIGS.USER_DATA
  );

  const handleSubmitForm = (evt) => {
    console.log('values: ', values);

    evt.preventDefault();
  };

  return (
    <AuthLayout>
      <Form id="form-signup">
        <Label
          text="display name"
          name="name"
          type="text"
          onInput={handleChange}
        />
        <Label text="email" name="email" type="email" onInput={handleChange} />
        <Label
          text="password"
          name="password"
          type="password"
          onInput={handleChange}
        />
        <Label text="file" name="file" type="file" />
      </Form>
      <AuthButton onClick={handleSubmitForm} />
    </AuthLayout>
  );
};

export default Register;

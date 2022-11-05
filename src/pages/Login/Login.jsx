import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import Form from '../../components/Form/Form';
import Label from '../../components/Label/Label';

import useFormAndValidation from '../../hooks/useFormAndValidation';
import { VALIDATION_CONFIGS, VALIDATION_PARAMS } from '../../utils/constants';

import './Login.scss';
import Button from '../../components/Button/Button';
import AuthButton from '../../components/AuthButton/AuthButton';

const Login = () => {
  const initValues = { email: '22', password: '33' };
  const { values, errors, isValid, handleChange } = useFormAndValidation(
    initValues,
    VALIDATION_CONFIGS.LOGIN
  );

  const handleSubmitForm = (evt) => {
    console.log('values: ', values);

    evt.preventDefault();
  };

  return (
    <AuthLayout>
      <Form id="form-signup">
        <Label text="email" name="email" type="email" onInput={handleChange} />
        {/* {errors.email && (
          <ErrorText type="auth">{errors.email}</ErrorText>
        )} */}
        <Label
          text="password"
          name="password"
          type="password"
          onInput={handleChange}
        />
        {/* {errors.password && (
          <ErrorText type="auth">{errors.password}</ErrorText>
        )} */}
      </Form>

      <AuthButton onClick={handleSubmitForm} />
    </AuthLayout>
  );
};

export default Login;

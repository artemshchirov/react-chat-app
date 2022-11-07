import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import Form from '../../components/Form/Form';
import Label from '../../components/Label/Label';
import AuthButton from '../../components/AuthButton/AuthButton';

import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import useFormAndValidation from '../../hooks/useFormAndValidation';
import {
  VALIDATION_CONFIGS,
  VALIDATION_PARAMS,
  PAGES,
} from '../../utils/constants';

import './Login.scss';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const initValues = { email: '', password: '' };
  const { values, errors, isValid, handleChange } = useFormAndValidation(
    initValues,
    VALIDATION_CONFIGS.LOGIN
  );

  const handleSubmitForm = async (evt) => {
    console.log('values: ', values);
    evt.preventDefault();

    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(PAGES.MAIN);
    } catch (err) {
      console.error('Login handleSubmitForm error: ', err);
      setError(true);
    }
  };

  return (
    <AuthLayout>
      <Form id="form-signup">
        <Label text="email" name="email" type="email" onChange={handleChange} />
        {/* {errors.email && (
          <ErrorText type="auth">{errors.email}</ErrorText>
        )} */}
        <Label
          text="password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {/* {errors.password && (
          <ErrorText type="auth">{errors.password}</ErrorText>
        )} */}
      </Form>
      <AuthButton type="submit" onClick={handleSubmitForm} />
    </AuthLayout>
  );
};

export default Login;

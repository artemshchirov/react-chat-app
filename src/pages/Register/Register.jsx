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
    console.log('evt.target: ', evt.target);
    evt.preventDefault();
  };

  return (
    <AuthLayout>
        <Form id="form-signup">
          <Label text="Name" name="text" type="text" />
          <Label text="Email" name="email" type="email" />
          <Label text="Password" name="password" type="password" />
          <Label type="file" />
          <AuthButton onClick={handleSubmitForm} />
        </Form>

    </AuthLayout>
  );
};

export default Register;

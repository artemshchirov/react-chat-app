import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import Form from '../../components/Form/Form';
import Label from '../../components/Label/Label';
import AuthButton from '../../components/AuthButton/AuthButton';

import useFormAndValidation from '../../hooks/useFormAndValidation';
import { VALIDATION_CONFIGS, VALIDATION_PARAMS } from '../../utils/constants';

import './Register.scss';

const Register = () => {
  const [error, setError] = useState(false);

  const initValues = { name: '', email: '', password: '', file: '' };
  const { values, errors, isValid, handleChange } = useFormAndValidation(
    initValues,
    VALIDATION_CONFIGS.USER_DATA
  );

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    const { name, email, password, file } = values;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storage = getStorage();
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        (error) => setError(true),
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await updateProfile(res.user, {
              displayName: name,
              photURL: downloadURL,
            });
          });
        }
      );
      setError(false);
    } catch (err) {
      console.error('error: ', err);
      setError(true);
    }
  };

  return (
    <AuthLayout>
      <Form>
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
        <Label text="file" name="file" type="file" onInput={handleChange} />
        {error ? <span> Something went wrong...</span> : ''}
      </Form>
      <AuthButton type="submit" onClick={handleSubmitForm} />
    </AuthLayout>
  );
};

export default Register;

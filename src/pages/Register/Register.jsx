import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import Form from '../../components/Form/Form';
import Label from '../../components/Label/Label';
import AuthButton from '../../components/AuthButton/AuthButton';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import useFormAndValidation from '../../hooks/useFormAndValidation';
import {
  VALIDATION_CONFIGS,
  VALIDATION_PARAMS,
  PAGES,
} from '../../utils/constants';

import './Register.scss';

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

      // Upload file and metadata to the object 'images/mountains.jpg'
      //TODO: если изменить file.name это крашит загрузку картинки
      const date = new Date().getTime();
      console.log('file: ', file);

      const storageRef = ref(storage, 'images/' + name + date);
      console.log('storageRef: ', storageRef);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log('uploaded downloadURL: ', downloadURL);

          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate(PAGES.MAIN);
          } catch (err) {
            console.error('err1: ', err);
            setError(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      console.error('err2: ', err);
      setError(true);
      // setLoading(false);
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
        {error ? (
          <span style={{ color: 'red' }}> Something went wrong...</span>
        ) : (
          ''
        )}
      </Form>
      <AuthButton type="submit" onClick={handleSubmitForm} />
    </AuthLayout>
  );
};

export default Register;

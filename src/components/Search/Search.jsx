import { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

import {
  serverTimestamp,
  collection,
  updateDoc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase';

import './Search.scss';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (evt) => setUsername(evt.target.value);

  const handleKey = (evt) => {
    evt.code === 'Enter' && handleSearch();
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log('querySnapshot: ', querySnapshot);

      querySnapshot.forEach((doc) => {
        console.log('doc: ', doc);
        setUser(doc.data());
      });
      console.log('user: ', user);

      setError(false);
    } catch (err) {
      console.error('Search querySnapshot err: ', err);
      setError(true);
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log('combinedId: ', combinedId);

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      console.log('try: ', res);

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }

      console.log('user: ', user);
      console.log('currentUser: ', currentUser);
      console.log('combinedId: ', combinedId);
      setError(false);
    } catch (err) {
      console.error('Search handleSelect err: ', err);
      setError(true);
    }
  };

  return (
    <div className="search">
      <div className="search__form">
        <input
          className="search__input"
          type="text"
          placeholder="find a user"
          onChange={handleInputChange}
          onKeyDown={handleKey}
        />
      </div>
      {error ? <span>User not found...</span> : null}
      {user ? (
        <div className="chats__user" onClick={handleSelect}>
          <img className="chats__avatar" src={user.photoURL} alt="user pic" />
          <div className="chats__info">
            <span className="chats__username">{user.displayName}</span>
            <p className="chats__message">Hello</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;

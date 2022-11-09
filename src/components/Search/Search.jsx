import { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

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
  const { chat } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);

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

      querySnapshot.forEach((doc) => {
        console.log('Search doc.data(): ', doc.data());
        setUser(doc.data());
      });

      setError(false);
    } catch (err) {
      console.error('Search querySnapshot err: ', err);
      setError(true);
    }
  };

  const handleSelect = async (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });

    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

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
        <div className="chats__user" onClick={() => handleSelect(user)}>
          <img className="chats__avatar" src={user.photoURL} alt="user pic" />
          <div className="chats__info">
            <span className="chats__username">{user.displayName}</span>
            <p className="chats__message"></p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;

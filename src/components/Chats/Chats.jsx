import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

import './Chats.scss';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        console.log('Current data: ', doc.data());
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log('chats: ', chats);

  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div className="chats__user" key={chat[0]}>
          <img
            className="chats__avatar"
            src={chat[1].userInfo.photoURL}
            alt="#"
          />
          <span className="chats__username">
            {chat[1].userInfo.displayName}
          </span>
          <p className="chats__message">{chat[1].userInfo.lastMessage?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Chats;

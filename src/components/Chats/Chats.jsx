import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

import './Chats.scss';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    console.log('USER: ', user);

    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  return (
    <div className="chats chats-scrollbar">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="chats__user"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="chats__avatar"
              src={chat[1].userInfo?.photoURL}
              alt="#"
            />
            <div className="chats__usertext">
              <span className="chats__username">
                {chat[1].userInfo?.displayName}
              </span>
              <p className="chats__message">{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;

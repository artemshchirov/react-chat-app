import { useEffect, useContext, useRef } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import './Message.scss';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { chat } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    console.log('ref: ', ref);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid ? 'owner' : ''
      }`}
    >
      <div className="message__info">
        <img
          className="message__avatar"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : chat.user.photoURL
          }
          alt="user avatar"
        />
        <span> just now</span>
      </div>
      <div className="message__content">
        <p className="message__text">{message.text}</p>
        {message.img ? (
          <img className="message__image" src={message.img} alt="user image" />
        ) : null}
      </div>
    </div>
  );
};

export default Message;

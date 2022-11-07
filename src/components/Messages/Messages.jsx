import { useState, useEffect, useContext } from 'react';

import { ChatContext } from '../../context/ChatContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

import Message from '../Message/Message';

import './Messages.scss';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chat } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chat.chatId), (doc) => {
      console.log('doc.data(): ', doc.data());
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsub();
  }, [chat.chatId]);

  return (
    <div className="messages custom-scrollbar">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;

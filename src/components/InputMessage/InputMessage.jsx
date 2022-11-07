import { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import Button from '../../components/Button/Button';

import {
  serverTimestamp,
  arrayUnion,
  Timestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';

import addImageImg from '../../img/img.png';
import attachFileImg from '../../img/attach.png';
import './InputMessage.scss';

const InputMessage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { chat } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      console.log('image: ', image);

      try {
        const storageRef = ref(storage, 'images/' + image.name + uuid());

        await uploadBytesResumable(storageRef, image).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, 'chats', chat.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            } catch (err) {
              console.error('err1: ', err);
              // setError(true);
              // setLoading(false);
            }
          });
        });
      } catch (err) {
        console.error('err2: ', err);
        // setError(true);
        // setLoading(false);
      }
    } else {
      try {
        await updateDoc(doc(db, 'chats', chat.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } catch (err) {
        console.error('err1: ', err);
        // setError(true);
        // setLoading(false);
      }
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [chat.chatId + '.lastMessage']: {
        text,
      },
      [chat.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', chat.user.uid), {
      [chat.chatId + '.lastMessage']: {
        text,
      },
      [chat.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  return (
    <div className="input-msg">
      <input
        className="input-msg__type"
        type="text"
        placeholder="Type something..."
        onChange={(evt) => setText(evt.target.value)}
        value={text}
      />

      <div className="input-msg__send">
        <input
          name="file"
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={(evt) => setImage(evt.target.files[0])}
        />
        <label htmlFor="file">
          <img
            className="button input-msg__icon"
            src={addImageImg}
            alt="add image icon"
          />
        </label>

        <img
          className="button input-msg__icon"
          src={attachFileImg}
          alt="attach icon"
        />

        <Button
          className="input-msg__send-btn"
          text="Send"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default InputMessage;

import Messages from '../Messages/Messages';

import camImg from '../../img/cam.png';
import addImg from '../../img/add.png';
import moreImg from '../../img/more.png';
import './Chat.scss';
import InputMessage from '../InputMessage/InputMessage';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span className="chat__username">ART</span>
        <div className="chat__icons">
          <img className="button chat__icon" src={camImg} alt="camera icon" />
          <img className="button chat__icon" src={addImg} alt="add icon" />
          <img className="button chat__icon" src={moreImg} alt="more icon" />
        </div>
      </div>
      <Messages />
      <InputMessage />
    </div>
  );
};

export default Chat;

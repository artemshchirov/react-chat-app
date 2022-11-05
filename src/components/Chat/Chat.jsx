import camImg from '../../img/cam.png';
import addImg from '../../img/add.png';
import moreImg from '../../img/more.png';
import './Chat.scss';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span className="chat__username">ART</span>
        <div className="chat__icons">
          <img className="chat__icon" src={camImg} alt="camera icon" />
          <img className="chat__icon" src={addImg} alt="add icon" />
          <img className="chat__icon" src={moreImg} alt="more icon" />
        </div>
      </div>
    </div>
  );
};

export default Chat;

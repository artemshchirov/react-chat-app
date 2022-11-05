import Button from '../../components/Button/Button';

import addImageImg from '../../img/img.png';
import attachFileImg from '../../img/attach.png';
import './InputMessage.scss';

const InputMessage = () => {
  return (
    <div className="input-msg">
      <input
        className="input-msg__type"
        type="text"
        placeholder="Type something..."
      />
      <div className="input-msg__send">
        <img
          className="button input-msg__icon"
          src={addImageImg}
          alt="add image icon"
        />
        <input type="file" style={{ display: 'none' }} className="type" />
        <label htmlFor="file">
          <img
            className="button input-msg__icon"
            src={attachFileImg}
            alt="attach icon"
          />
        </label>
        <Button className="input-msg__send-btn" text="Send" />
      </div>
    </div>
  );
};

export default InputMessage;

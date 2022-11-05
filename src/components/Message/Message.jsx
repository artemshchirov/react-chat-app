import './Message.scss';

const Message = () => {
  return (
    <div className="message owner">
      <div className="message__info">
        <img
          className="message__avatar"
          src="https://avatars.githubusercontent.com/u/78075439?v=4"
          alt="user avatar"
        />
        <span> just now</span>
      </div>
      <div className="message__content">
        <p className="message__text">hello</p>
        <img
          className="message__image"
          src="https://i.pinimg.com/564x/8f/3f/e9/8f3fe9efdf8fed6c216820fcd8d8b308.jpg"
          alt="user message image"
        />
      </div>
    </div>
  );
};

export default Message;

import './Search.scss';

const Search = () => {
  return (
    <div className="search">
      <div className="search__form">
        <input
          className="search__input"
          type="text"
          placeholder="find a user"
        />
      </div>

      <div className="chats__user">
        <img
          className="chats__avatar"
          src="https://avatars.githubusercontent.com/u/78075439?v=4"
          alt="#"
        />
        <div className="chats__info">
          <span className="chats__username">ART</span>
          <p className="chats__message">Hello</p>
        </div>
      </div>

    </div>
  );
};

export default Search;

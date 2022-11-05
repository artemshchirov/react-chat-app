import Label from '../Label/Label';

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
    </div>
  );
};

export default Search;

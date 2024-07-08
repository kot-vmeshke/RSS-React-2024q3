import { FC, useState } from 'react';
import SearchIcon from '../../assets/search-sm.svg';
import './SearchBar.scss';
import { SearchBarProps } from '../../types';

const SearchBar: FC<SearchBarProps> = ({ updateSearchString }) => {
  const [query, setQuery] = useState<string>(
    localStorage.getItem('books-search') || ''
  );

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="author name"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') updateSearchString(query);
        }}
      />
      <button
        className="search__button"
        type="button"
        onClick={() => updateSearchString(query)}
      >
        <img src={SearchIcon} alt="" width={20} />
      </button>
    </div>
  );
};

export { SearchBar };

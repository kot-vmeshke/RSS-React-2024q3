import { FC, FormEvent, useRef } from 'react';
import SearchIcon from '../../assets/search-sm.svg';
import './SearchBar.scss';
import { SearchBarProps } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchBar: FC<SearchBarProps> = ({ updateSearchString }) => {
  const [query, setQuery] = useLocalStorage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      setQuery(inputRef.current.value);
      updateSearchString(inputRef.current.value);
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="author name"
        defaultValue={query}
        ref={inputRef}
      />
      <button className="search__button" type="submit">
        <img src={SearchIcon} alt="" width={20} />
      </button>
    </form>
  );
};

export { SearchBar };

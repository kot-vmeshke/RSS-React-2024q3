import './SearchBar.css';
import { FC, FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../assets/search-sm.svg';
// import { useLocalStorage } from '../../hooks/useLocalStorage';
import { updateSearchString } from '../../store/searchSlice';
import { RootState } from '../../store/store';
import { SearchBarProps } from '../../types';

const SearchBar: FC<SearchBarProps> = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [, setQuery] = useLocalStorage();
  // const searchString = useSelector(
  //   (state: RootState) => state.search.searchString
  // );
  const inputRef = useRef<HTMLInputElement>(null);
  // const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const queryString = inputRef.current.value;
      console.log(queryString);
      // setQuery(queryString);
      // dispatch(updateSearchString(queryString));
      // searchParams.set('search', `${queryString}`);
      // setSearchParams(searchParams);
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
        defaultValue={''}
        ref={inputRef}
      />
      <button className="search__button" type="submit">
        <img src={SearchIcon} alt="" width={20} />
      </button>
    </form>
  );
};

export { SearchBar };

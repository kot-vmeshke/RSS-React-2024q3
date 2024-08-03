import { FC, FormEvent, useRef } from 'react';
import Image from 'next/image';
import { SearchBarProps } from '../types';
import SearchIcon from '../assets/search-sm.svg';
import { updateSearchString } from '../store/searchSlice';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SearchBar: FC<SearchBarProps> = () => {
  const [, setQuery] = useLocalStorage();
  const searchString = useAppSelector((state) => state.search.searchString);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const queryString = inputRef.current.value;
      setQuery(queryString);
      dispatch(updateSearchString(queryString));
    }
  };

  return (
    <form
      className="flex w-full max-w-[494px] p-[4px] pl-[16px] rounded-[40px] bg-color-bg-light dark:bg-dark-color-bg-light has-[:focus-visible]:outline-color-text has-[:focus-visible]:outline has-[:focus-visible]:outline-[1px] dark:has-[:focus-visible]:outline-dark-color-text"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full border-none text-color-text dark:text-dark-color-text font-light text-[14px] focus-visible:outline-none placeholder:opacity-40 dark:placeholder:opacity-60 bg-transparent autofill:bg-transparent autofill:text-[#000000_!important] dark:autofill:text-[#ffffff_!important]  autofill:shadow-[0_0_0px_1000px_#ffffff_inset_!important] dark:autofill:shadow-[0_0_0px_1000px_#1f1f1f_inset_!important]"
        type="text"
        name="search"
        id="search"
        placeholder="author name"
        defaultValue={searchString}
        ref={inputRef}
      />
      <button
        className="flex items-center justify-center p-[6px] border-none rounded-[32px] bg-color-bg-dark dark:bg-dark-color-bg-dark flex-shrink-0 cursor-pointer"
        type="submit"
      >
        <Image src={SearchIcon} alt="" width={20} />
      </button>
    </form>
  );
};

export { SearchBar };

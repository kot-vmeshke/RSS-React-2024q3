import { Form, useSubmit } from '@remix-run/react';
import { FC, useRef } from 'react';
import { SearchIcon } from '../assets';

const SearchBar: FC<{ search: string | null }> = ({ search }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useSubmit();

  return (
    <Form className="search" onSubmit={(event) => submit(event.currentTarget)}>
      <input
        className="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="author name"
        defaultValue={search ? search : ''}
        ref={inputRef}
      />
      <button className="search__button" type="submit">
        <img src={SearchIcon} alt="" width={20} />
      </button>
    </Form>
  );
};

export { SearchBar };

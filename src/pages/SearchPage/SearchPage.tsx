import { FC, useEffect, useState } from 'react';
import { Header, Main } from '../../components';
import { Book } from '../../types';

const SearchPage: FC = () => {
  const [searchString, setSeacrhStaring] = useState<string>(
    localStorage.getItem('books-search') || ''
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [booksList, setBooksList] = useState<Book[]>([]);

  const updateSearchString = (str: string) => {
    setSeacrhStaring(str);
    localStorage.setItem('books-search', str);
  };

  const fetchBooks = async (str: string) => {
    setIsLoaded(false);
    try {
      const res = await fetch(`http://gutendex.com/books?search=${str}`);
      if (res.ok) {
        const data = await res.json();
        setBooksList(data.results);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchBooks(searchString);
  }, [searchString]);

  return (
    <div className="page">
      <Header
        searchString={searchString}
        updateSearchString={updateSearchString}
      />
      <Main isLoaded={isLoaded} booksList={booksList} />
    </div>
  );
};

export { SearchPage };

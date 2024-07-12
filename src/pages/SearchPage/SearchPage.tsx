import { FC, useEffect, useState } from 'react';
import { Header, Main } from '../../components';
import { Book } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchPage: FC = () => {
  const [searchString] = useLocalStorage();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [newSearchString, setNewSearchString] = useState<string>('');

  const updateSearchString = (str: string) => {
    setNewSearchString(str);
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
    setNewSearchString(searchString);
  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchBooks(newSearchString);
  }, [newSearchString]);

  return (
    <div className="page">
      <Header updateSearchString={updateSearchString} />
      <Main isLoaded={isLoaded} booksList={booksList} />
    </div>
  );
};

export { SearchPage };

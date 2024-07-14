import { FC, useCallback, useEffect, useState } from 'react';
import { Header, Main } from '../../components';
import { Book } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString] = useLocalStorage();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [newSearchString, setNewSearchString] = useState<string>(
    searchString || ''
  );
  const [paginationData, setPaginationData] = useState({
    next: null,
    previous: null,
    pageNumber: +(searchParams?.get('page') ?? 1),
    allPages: 1,
  });

  const updateSearchString = (str: string) => {
    setNewSearchString(str);
  };

  const updatePageNumber = (page: number) => {
    setPaginationData({ ...paginationData, pageNumber: page });
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  const fetchBooks = useCallback(
    async (str: string, page: number = 1) => {
      setIsLoaded(false);
      try {
        const res = await fetch(
          `https://gutendex.com/books?search=${str}&page=${page}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const allPages = Math.round(data.count / 32);
          setBooksList(data.results);
          setPaginationData((prev) => ({
            ...prev,
            next: data.next,
            previous: data.previous,
            allPages
          }));
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoaded(true);
      }
    },
    [setBooksList, setPaginationData]
  );

  useEffect(() => {
    fetchBooks(newSearchString, paginationData.pageNumber);
  }, [newSearchString, paginationData.pageNumber, fetchBooks]);

  return (
    <div className="page" data-testid="page-container">
      <Header updateSearchString={updateSearchString} />
      <Main
        isLoaded={isLoaded}
        booksList={booksList}
        paginationData={{ ...paginationData, updatePageNumber }}
      />
    </div>
  );
};

export { SearchPage };

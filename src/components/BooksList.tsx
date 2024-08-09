import { FC, useEffect, useState } from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { Loader } from './Loader';
import { useAppSelector } from '../store/store';
import { useRouter } from 'next/router';

const BooksList: FC = () => {
  const { results: books } = useAppSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    return () => {
      router.events.off('routeChangeStart', () => {
        setIsLoading(true);
      });
      router.events.off('routeChangeComplete', () => {
        setIsLoading(false);
      });
    };
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="grid grid-cols-1 gap-[12px] list-none h-[calc(100svh-272px)] overflow-y-auto scrollbar-none pb-[65px] mask @[988px]/main:grid-cols-[repeat(2,_calc(50%-6px))] auto-rows-min">
          {books.length ? (
            books.map((book: Book) => <BookCard {...book} key={book.id} />)
          ) : (
            <div className="col-[1_/_-1] text-center text-[14px] text-color-text dark:text-dark-color-text opacity-70">
              Nothing was found
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export { BooksList };

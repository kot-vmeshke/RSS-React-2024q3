import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { PaginationProps } from '../types';
import arrowNext from '../assets/arrow-circle-broken-right.svg';
import arrowPrev from '../assets/arrow-circle-broken-left.svg';
import { updatePage } from '../store/searchSlice';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Pagination: FC<PaginationProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { page } = useAppSelector((state) => state.search);
  const data = useAppSelector((state) => state.data);
  const dispatch = useDispatch();

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

  const updatePageNumber = (page: number) => {
    dispatch(updatePage(`${page}`));
    router.push({ query: { ...router.query, page: page } });
  };

  return (
    <>
      {!isLoading && (
        <div
          className="flex items-center justify-center gap-[6px] mt-[32px] col-[1_/_-1]"
          data-testid="pagination"
        >
          <button
            className={`flex items-center justify-center w-[32px] h-[32px] shrink-0 border-0 bg-color-bg-light dark:bg-dark-color-bg-light rounded-[32px] ${data.previous ? '' : 'pointer-events-none opacity-10'}`}
            onClick={() => updatePageNumber(+(page ?? 1) - 1)}
            data-testid="prev"
          >
            <Image src={arrowPrev} alt="" className="dark:invert-[100%]" />
          </button>
          <div
            className="flex items-center justify-center w-auto h-[32px] shrink-0 border-0 bg-color-bg-medium dark:bg-dark-color-bg-medium text-[18px] px-[16px] py-[8px] rounded-[32px] text-color-text dark:text-dark-color-text"
            data-testid="page-number"
          >
            {page ?? 1} of {data.count > 32 ? Math.round(data.count / 32) : 1}
          </div>
          <button
            className={`flex items-center justify-center w-[32px] h-[32px] shrink-0 border-0 bg-color-bg-light dark:bg-dark-color-bg-light rounded-[32px] ${data.next ? '' : 'pointer-events-none opacity-10'}`}
            onClick={() => updatePageNumber(+(page ?? 1) + 1)}
            data-testid="next"
          >
            <Image src={arrowNext} alt="" className="dark:invert-[100%]" />
          </button>
        </div>
      )}
    </>
  );
};

export { Pagination };

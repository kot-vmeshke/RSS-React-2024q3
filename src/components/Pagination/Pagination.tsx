import './Pagination.css';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import arrowPrev from '../../assets/arrow-circle-broken-left.svg';
import arrowNext from '../../assets/arrow-circle-broken-right.svg';
import { apiSlice } from '../../store/apiSlice';
import { RootState } from '../../store/store';
import { PaginationProps } from '../../types';

const Pagination: FC<PaginationProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );
  const { data, isFetching } = apiSlice.useGetBooksQuery({
    str: searchString,
    page: searchParams.get('page') || '1',
  });

  const updatePageNumber = (page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  return (
    <>
      {!isFetching && (
        <div className="pagination" data-testid="pagination">
          <button
            className={`pagination__arrow ${data.previous ? '' : 'pagination__arrow_disabled'}`}
            onClick={() =>
              updatePageNumber(+(searchParams?.get('page') ?? 1) - 1)
            }
            data-testid="prev"
          >
            <img src={arrowPrev} alt="" />
          </button>
          <div
            className="pagination__number pagination__number_active"
            data-testid="page-number"
          >
            {searchParams.get('page') ?? 1} of{' '}
            {data.count > 32 ? Math.round(data.count / 32) : 1}
          </div>
          <button
            className={`pagination__arrow ${data.next ? '' : 'pagination__arrow_disabled'}`}
            onClick={() =>
              updatePageNumber(+(searchParams?.get('page') ?? 1) + 1)
            }
            data-testid="next"
          >
            <img src={arrowNext} alt="" />
          </button>
        </div>
      )}
    </>
  );
};

export { Pagination };

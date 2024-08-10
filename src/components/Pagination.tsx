import './Pagination.css';
import { useSearchParams } from '@remix-run/react';
import { FC } from 'react';
import { Data } from 'src/types';
import arrowPrev from '../../assets/arrow-circle-broken-left.svg';
import arrowNext from '../../assets/arrow-circle-broken-right.svg';

const Pagination: FC<{ data: Data }> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updatePageNumber = (page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="pagination" data-testid="pagination">
      <button
        className={`pagination__arrow ${data.previous ? '' : 'pagination__arrow_disabled'}`}
        onClick={() => updatePageNumber(+(searchParams?.get('page') ?? 1) - 1)}
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
        onClick={() => updatePageNumber(+(searchParams?.get('page') ?? 1) + 1)}
        data-testid="next"
      >
        <img src={arrowNext} alt="" />
      </button>
    </div>
  );
};

export { Pagination };

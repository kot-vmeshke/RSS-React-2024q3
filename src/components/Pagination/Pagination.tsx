import './Pagination.scss';
import arrowPrev from '../../assets/arrow-circle-broken-left.svg';
import arrowNext from '../../assets/arrow-circle-broken-right.svg';
import { FC } from 'react';
import { PaginationProps } from '../../types';

const Pagination: FC<PaginationProps> = ({
  next,
  previous,
  pageNumber,
  updatePageNumber,
}) => {
  return (
    <div className="pagination" data-testid="pagination">
      <button
        className={`pagination__arrow ${previous ? '' : 'pagination__arrow_disabled'}`}
        onClick={() => updatePageNumber(pageNumber - 1)}
        data-testid="prev"
      >
        <img src={arrowPrev} alt="" />
      </button>
      <div
        className="pagination__number pagination__number_active"
        data-testid="page-number"
      >
        {pageNumber}
      </div>
      <button
        className={`pagination__arrow ${next ? '' : 'pagination__arrow_disabled'}`}
        onClick={() => updatePageNumber(pageNumber + 1)}
        data-testid="next"
      >
        <img src={arrowNext} alt="" />
      </button>
    </div>
  );
};

export { Pagination };

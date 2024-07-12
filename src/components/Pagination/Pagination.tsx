import './Pagination.scss';
import arrowPrev from '../../assets/arrow-circle-broken-left.svg';
import arrowNext from '../../assets/arrow-circle-broken-right.svg';

const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination__arrow pagination__arrow_disabled">
        <img src={arrowPrev} alt="" />
      </button>
      <button className="pagination__number pagination__number_active">
        1
      </button>
      <button className="pagination__arrow">
        <img src={arrowNext} alt="" />
      </button>
    </div>
  );
};

export {Pagination};

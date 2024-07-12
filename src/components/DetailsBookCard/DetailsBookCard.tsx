import { Link } from 'react-router-dom';
import './DetailsBookCard.scss';
import downloadIcon from '../../assets/download-04.svg';
import defaultCover from '../../assets/no-cover.jpg';

const DetailsBookCard = () => {
  return (
    <div className="details">
      <Link to="/" className="details__close">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <div className="details__cover">
        <img src={defaultCover} alt="" width={216} height={150}/>
      </div>
      <h3 className="details__name">
        The Declaration of Independence of the United States of America
      </h3>
      <p className="details__author">Jefferson, Thomas (1743-1826)</p>
      <div className="details__wrap">
        <p className="details__type">Subjects:</p>
        <p className="details__text">
          United States -- History -- Revolution, 1775-1783 -- Sources, United
          States. Declaration of Independence
        </p>
      </div>
      <div className="details__wrap">
        <p className="details__type">Bookshelves:</p>
        <p className="details__text">
          American Revolutionary War, Politics, United States Law
        </p>
      </div>
      <a href="" className="details__download">
        Download PDF
        <img src={downloadIcon} alt="" width={24} height={24}/>
      </a>
    </div>
  );
};

export { DetailsBookCard };

import './DetailsBookCard.css';
import { Link } from '@remix-run/react';
import { FC } from 'react';

import defaultCover from '../../assets/no-cover.jpg';
import readIcon from '../../assets/share-03.svg';
import { Book, Person } from '../../types';

const DetailsBookCard: FC<{ data: Book }> = ({ data }) => {
  return (
    <div className="details" data-testid="details">
      <Link to={`/`} className="details__close" data-testid="close-btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <>
        <div className="details__cover">
          <img
            src={data.formats!['image/jpeg'] || defaultCover}
            alt=""
            width={216}
            height={150}
          />
        </div>
        <h3 className="details__name">{data.title}</h3>
        <p className="details__author">
          {data.authors
            .map(
              (author: Person) =>
                `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
            )
            .join(',')}
        </p>
        <div className="details__wrap">
          <p className="details__type">Subjects:</p>
          <p className="details__text">{data.subjects.join(', ')}</p>
        </div>
        <div className="details__wrap">
          <p className="details__type">Bookshelves:</p>
          <p className="details__text">
            {data.bookshelves?.length ? data.bookshelves.join(', ') : '-'}
          </p>
        </div>
        {data.formats!['text/html'] && (
          <a
            href={data.formats!['text/html']}
            className="details__download"
            target="_blank"
          >
            Read
            <img src={readIcon} alt="" width={12} height={12} />
          </a>
        )}
      </>
    </div>
  );
};

export { DetailsBookCard };

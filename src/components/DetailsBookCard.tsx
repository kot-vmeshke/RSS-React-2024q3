import { Link, useSearchParams } from '@remix-run/react';
import { FC } from 'react';

import { CloseIcon } from './icons';
import { defaultCover, readIcon } from '../assets';
import { Book, Person } from '../types';

const DetailsBookCard: FC<{ data: Book }> = ({ data }) => {
  const [searchParams] = useSearchParams();

  const href = `/?${searchParams.toString()}`;
  const authorsNames = data.authors
    .map(
      (author: Person) =>
        `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
    )
    .join(',');
  const subjectsString = data.subjects.join(', ');
  const bookShelves = data.bookshelves?.length
    ? data.bookshelves.join(', ')
    : '-';

  return (
    <div className="details-wrapper">
      <div className="details" data-testid="details">
        <Link to={href} className="details__close" data-testid="close-btn">
          <CloseIcon />
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
          <p className="details__author">{authorsNames}</p>
          <div className="details__wrap">
            <p className="details__type">Subjects:</p>
            <p className="details__text">{subjectsString}</p>
          </div>
          <div className="details__wrap">
            <p className="details__type">Bookshelves:</p>
            <p className="details__text">{bookShelves}</p>
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
    </div>
  );
};

export { DetailsBookCard };

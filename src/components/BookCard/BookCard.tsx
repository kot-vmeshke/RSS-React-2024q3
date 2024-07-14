import { FC } from 'react';

import './BookCard.scss';
import { Book } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {

  const [searchParams ] = useSearchParams();

  return (
    <li className="book-wrap">
      <Link
        className="book"
        to={`book/${id}?${searchParams.toString()}`}
        data-testid="book"
      >
        <span className="book__author">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <span className="book__name">{title}</span>
        <span className="book__subjects">Subjects: {subjects.join(', ')}.</span>
      </Link>
    </li>
  );
};

export { BookCard };

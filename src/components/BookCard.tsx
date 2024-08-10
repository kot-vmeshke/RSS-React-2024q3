import { Link, useSearchParams } from '@remix-run/react';
import { FC } from 'react';
import { CheckButton } from './CheckButton';
import { Book } from '../types';

const BookCard: FC<Book> = (props) => {
  const { id, authors, title, subjects } = props;
  const [searchParams] = useSearchParams();

  const authorsNames = authors.map((author) => author.name).join(', ');
  const subjectsString = subjects.join(', ');
  const href = `/${id}?${searchParams.toString()}`;

  return (
    <li className="book-wrap">
      <div className="book">
        <CheckButton book={props} />
        <span className="book__author">{authorsNames}</span>
        <Link to={href} className="book__name" data-testid="book">
          {title}
        </Link>
        <span className="book__subjects">Subjects: {subjectsString}.</span>
      </div>
    </li>
  );
};

export { BookCard };

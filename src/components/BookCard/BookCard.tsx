import './BookCard.css';
import { Link } from '@remix-run/react';
import { FC } from 'react';
import { Book } from '../../types';
// import { CheckButton } from '../CheckButton';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {
  return (
    <li className="book-wrap">
      <div className="book">
        {/* <CheckButton bookId={id} /> */}
        <span className="book__author">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <Link to={`${id}`} className="book__name" data-testid="book">
          {title}
        </Link>
        <span className="book__subjects">Subjects: {subjects.join(', ')}.</span>
      </div>
    </li>
  );
};

export { BookCard };

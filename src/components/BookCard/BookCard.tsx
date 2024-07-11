import { FC } from 'react';

import './BookCard.scss';
import { Book } from '../../types';

const BookCard: FC<Book> = ({ authors, title, subjects }) => {
  return (
    <li className="book" data-testid="book">
      <span className="book__author">
        {authors.map((author) => author.name).join(', ')}
      </span>
      <span className="book__name">{title}</span>
      <span className="book__subjects">Subjects: {subjects.join(', ')}.</span>
    </li>
  );
};

export { BookCard };

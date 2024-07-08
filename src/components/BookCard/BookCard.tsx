import { Component } from 'react';

import './BookCard.scss';
import { Book } from '../BooksList/BooksList';

class BookCard extends Component<Book> {
  render() {
    const { authors, title, subjects } = this.props;
    return (
      <li className="book">
        <span className="book__author">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <span className="book__name">{title}</span>
        <span className="book__subjects">Subjects: {subjects.join(', ')}.</span>
      </li>
    );
  }
}

export { BookCard };

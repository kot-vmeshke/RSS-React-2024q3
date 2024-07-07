import { Component } from 'react';

import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';

class BooksList extends Component {
  render() {
    return (
      <ul className="books-list">
        <BookCard />
      </ul>
    );
  }
}

export { BooksList };

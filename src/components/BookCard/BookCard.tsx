import { Component } from 'react';

import './BookCard.scss';

class BookCard extends Component {
  render() {
    return (
      <li className="book">
        <span className="book__author">Author name</span>
        <span className="book__name">Book name</span>
        <span className="book__subjects">Subjects: one, two, etc.</span>
      </li>
    );
  }
}

export { BookCard };

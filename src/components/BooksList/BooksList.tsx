import { Component } from 'react';

import './BooksList.scss';

class BooksList extends Component {
  render() {
    return (
      <ul className="books-list">
        <li className="book">
          <span className="book__author"></span>
          <span className="book__name"></span>
          <span className="book__subjects"></span>
        </li>
      </ul>
    );
  }
}

export { BooksList };

import { Component } from 'react';
import './Main.scss';

class Main extends Component {
  render() {
    return (
      <main className="main">
        <div className="container main__container">
          <ul className="books-list">
            <li className="book">
              <span className="book__author"></span>
              <span className="book__name"></span>
              <span className="book__subjects"></span>
            </li>
          </ul>
        </div>
      </main>
    );
  }
}

export { Main };

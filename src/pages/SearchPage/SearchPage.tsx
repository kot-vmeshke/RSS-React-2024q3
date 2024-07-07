import { Component } from 'react';
import { Header } from '../../components';

class SearchPage extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="container">
            <ul className="books-list">
              <li className="book">
                <span className="book__author"></span>
                <span className="book__name"></span>
                <span className="book__subjects"></span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export { SearchPage };

import { Component } from 'react';
import './Main.scss';
import { BooksList } from '../BooksList/BooksList';

class Main extends Component {
  render() {
    return (
      <main className="main">
        <div className="container main__container">
          <BooksList />
        </div>
      </main>
    );
  }
}

export { Main };

import { Component } from 'react';

import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';
import { Loader } from '../Loader/Loader';

interface BooksListProps {}
interface BooksListState {
  booksList: string[];
  isLoaded: boolean;
}

class BooksList extends Component<BooksListProps, BooksListState> {
  constructor(props: BooksListProps) {
    super(props);
    this.state = {
      booksList: [],
      isLoaded: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 3000);
  }
  render() {
    const { booksList, isLoaded } = this.state;
    return (
      <>
        {isLoaded ? (
          <ul className="books-list">
            {booksList.length ? (
              <BookCard />
            ) : (
              <span className="books-list__nothing">Nothing was found</span>
            )}
          </ul>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export { BooksList };

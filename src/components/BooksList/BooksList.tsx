import { Component } from 'react';

import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';
import { Loader } from '../Loader/Loader';

export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}
export interface Format {
  [key: string]: string;
}
export interface Book {
  id: number;
  title: string;
  authors: Person[];
  translators: Person[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
}
interface BooksListProps {
  booksList: Book[];
  isLoaded: boolean;
}

class BooksList extends Component<BooksListProps> {
  constructor(props: BooksListProps) {
    super(props);
  }

  render() {
    const { booksList, isLoaded } = this.props;
    return (
      <>
        {isLoaded ? (
          <ul className="books-list">
            {booksList.length ? (
              booksList.map((book) => <BookCard {...book} key={book.id} />)
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

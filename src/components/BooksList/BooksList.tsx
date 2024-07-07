import { Component } from 'react';

import './BooksList.scss';
import { BookCard } from '../BookCard/BookCard';
import { Loader } from '../Loader/Loader';
import { SearchContext } from '../../context/SearchContext';

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
interface BooksListProps {}
interface BooksListState {
  booksList: Book[];
  isLoaded: boolean;
}

class BooksList extends Component<BooksListProps, BooksListState> {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  constructor(props: BooksListProps) {
    super(props);
    this.state = {
      booksList: [],
      isLoaded: false,
    };
  }

  componentDidMount(): void {
    const queryString = this.context.searchString.length
      ? this.context.searchString
      : '';
    fetch(`http://gutendex.com/books?search=${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          booksList: [...data.results],
        });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() =>
        this.setState({
          isLoaded: true,
        })
      );
  }

  render() {
    const { booksList, isLoaded } = this.state;
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

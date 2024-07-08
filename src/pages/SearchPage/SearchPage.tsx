import { Component } from 'react';
import { Header, Main } from '../../components';
import { Book } from '../../components/BooksList/BooksList';

interface SearchPageProps {}
interface SearchPageState {
  searchString: string;
  isLoaded: boolean;
  booksList: Book[];
}

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      searchString: localStorage.getItem('books-search') || '',
      isLoaded: false,
      booksList: [],
    };
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  updateSearchString(str: string) {
    this.setState({
      searchString: str,
    });
    localStorage.setItem('books-search', str);
  }

  async fetchBooks(str: string) {
    this.setState({ isLoaded: false });
    try {
      const res = await fetch(`http://gutendex.com/books?search=${str}`);
      if (res.ok) {
        const data = await res.json();
        this.setState({ booksList: data.results });
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoaded: true });
    }
  }

  componentDidMount(): void {
    this.fetchBooks(this.state.searchString);
  }

  componentDidUpdate(prevState: Readonly<SearchPageState>): void {
    if (this.state.searchString !== prevState.searchString) {
      console.log(
        `http://gutendex.com/books?search=${this.state.searchString}`
      );
      // this.fetchBooks(this.state.searchString);
      //? infinity loop
    }
  }

  render() {
    const { searchString, isLoaded, booksList } = this.state;
    return (
      <div className="page">
        <Header
          searchString={searchString}
          updateSearchString={this.updateSearchString}
        />
        <Main isLoaded={isLoaded} booksList={booksList} />
      </div>
    );
  }
}

export { SearchPage };

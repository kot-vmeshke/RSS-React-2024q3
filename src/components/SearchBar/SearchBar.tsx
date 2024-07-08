import { Component } from 'react';
import SearchIcon from '../../assets/search-sm.svg';
import './SearchBar.scss';

export interface SearchBarProps {
  searchString: string;
  updateSearchString: (str: string) => void;
}

export interface SearchBarState {
  query: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: localStorage.getItem('books-search') || '',
    };
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          placeholder="author name"
          value={query}
          onChange={(e) => {
            this.setState({ query: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') this.props.updateSearchString(query);
          }}
        />
        <button
          className="search__button"
          type="button"
          onClick={() => this.props.updateSearchString(query)}
        >
          <img src={SearchIcon} alt="" width={20} />
        </button>
      </div>
    );
  }
}

export { SearchBar };

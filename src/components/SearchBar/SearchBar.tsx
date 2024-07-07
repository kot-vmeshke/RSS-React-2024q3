import { ChangeEvent, Component } from 'react';
import SearchIcon from '../../assets/search-sm.svg';
import './SearchBar.scss';
import { SearchContext } from '../../context/SearchContext';

interface SearchBarProps {}

interface SearchBarState {
  searchString: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchStringUpdated: string = e.target.value;
    this.context.updateString(searchStringUpdated);
    localStorage.setItem('books-seacrh', searchStringUpdated);
  }

  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          placeholder="author name"
          value={this.context.searchString}
          onChange={(e) => this.handleChange(e)}
        />
        <button className="search__button" type="button">
          <img src={SearchIcon} alt="" width={20} />
        </button>
      </div>
    );
  }
}

export { SearchBar };

import { Component } from 'react';
import SearchIcon from '../../assets/search-sm.svg';
import './SearchBar.scss';

interface SearchBarProps {
  searchString: string;
}

class SearchBar extends Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
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
          value={this.props.searchString}
        />
        <button className="search__button" type="button">
          <img src={SearchIcon} alt="" width={20} />
        </button>
      </div>
    );
  }
}

export { SearchBar };

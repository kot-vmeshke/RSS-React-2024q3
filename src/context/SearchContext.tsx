import React, { Component, ReactNode } from 'react';

export interface SearchContextType {
  searchString: string;
  updateString: (str: string) => void;
}
interface SearchContextState {
  searchString: string;
}
interface SearchProviderProps {
  children?: ReactNode;
}

export const SearchContext = React.createContext<SearchContextType>({
  searchString: '',
  updateString: () => {},
});

export class SearchProvider extends Component<
  SearchProviderProps,
  SearchContextState
> {
  constructor(props: SearchProviderProps) {
    super(props);
    this.state = {
      searchString: localStorage.getItem('books-seacrh') || '',
    };
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  updateSearchString(str: string) {
    this.setState({
      searchString: str,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <SearchContext.Provider
        value={{
          searchString: this.state.searchString,
          updateString: this.updateSearchString,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  }
}

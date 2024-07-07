import { Component } from 'react';
import { Header, Main } from '../../components';

interface SearchPageProps {}
interface SearchPageState {
  searchStaring: string;
}

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  //const res = await fetch(`http://gutendex.com/books?search=${str}`);
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      searchStaring: '',
    };
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  updateSearchString(str: string) {
    this.setState({
      searchStaring: str,
    });
    console.log(str);
  }

  render() {
    const { searchStaring } = this.state;
    return (
      <div className="page">
        <Header
          searchString={searchStaring}
          updateSearchString={this.updateSearchString}
        />
        <Main isLoaded={true} booksList={[]} />
      </div>
    );
  }
}

export { SearchPage };

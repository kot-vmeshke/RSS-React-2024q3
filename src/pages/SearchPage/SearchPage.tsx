import { Component } from 'react';
import { Header, Main } from '../../components';

class SearchPage extends Component {
  //const res = await fetch(`http://gutendex.com/books?search=${str}`);
  render() {
    return (
      <div className="page">
        <Header />
        <Main />
      </div>
    );
  }
}

export { SearchPage };

import { Component } from 'react';
import './Main.scss';
import { Book, BooksList } from '../BooksList/BooksList';

interface MainState {
  error: boolean;
}
export interface MainProps {
  isLoaded: boolean;
  booksList: Book[];
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidUpdate(): void {
    if (this.state.error) {
      throw new Error('You clicked the button to create a test bug');
    }
  }

  render() {
    return (
      <main className="main">
        <div className="container main__container">
          <button
            className="main-button"
            onClick={() => {
              this.setState({ error: true });
            }}
          >
            Create Error
          </button>
          <BooksList
            isLoaded={this.props.isLoaded}
            booksList={this.props.booksList}
          />
        </div>
      </main>
    );
  }
}

export { Main };

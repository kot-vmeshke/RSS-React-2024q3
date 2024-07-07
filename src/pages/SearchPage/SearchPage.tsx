import { Component } from 'react';

class SearchPage extends Component {
  render() {
    return (
      <div className="page">
        <header className='header'>
          <div className="container">
            <h1>Search books by author</h1>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="author name"
              />
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className='main'>
          <div className="container">
            <ul>
              <li>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export { SearchPage };

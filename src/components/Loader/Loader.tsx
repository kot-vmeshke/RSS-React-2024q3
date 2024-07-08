import { Component } from 'react';
import './Loader.scss';

class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}

export { Loader };

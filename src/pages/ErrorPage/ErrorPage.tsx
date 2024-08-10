import './ErrorPage.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page page_error ${theme}`}>
      <h1>404</h1>
      This page doesn't exist
      <a href="/" className="main-button">
        Go to main page
      </a>
    </div>
  );
};

export { ErrorPage };

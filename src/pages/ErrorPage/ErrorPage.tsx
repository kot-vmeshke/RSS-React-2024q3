import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className="page page_error">
      <h1>404</h1>
      This page doesn't exist
      <a href="/" className="main-button">
        Go to main page
      </a>
    </div>
  );
}

export {ErrorPage}

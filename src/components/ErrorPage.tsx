const ErrorPage = () => {
  const theme = 'light';

  return (
    <div className={`page page_error ${theme}`} data-testid="error-page">
      <h1>404</h1>
      This page doesn't exist
      <a href="/" className="main-button">
        Go to main page
      </a>
    </div>
  );
};

export { ErrorPage };

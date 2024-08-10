import { FC } from 'react';
import React from 'react';
import { FlyingList, Header, Main } from './components';

const SearchPage: FC = () => {
  const theme = 'light';

  return (
    <div className={`page ${theme}`} data-testid="page-container">
      <Header />
      <Main />
      <FlyingList />
    </div>
  );
};

export { SearchPage };

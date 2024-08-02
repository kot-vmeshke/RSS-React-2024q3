import { FC, useContext } from 'react';
import { FlyingList } from './FlyingList';
import { Header } from './Header';
import { Main } from './Main';
import { ThemeContext } from '../context/ThemeContext';

const SearchPage: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page ${theme}`} data-testid="page-container">
      <Header />
      {/* <Main />
      <FlyingList /> */}
    </div>
  );
};

export { SearchPage };

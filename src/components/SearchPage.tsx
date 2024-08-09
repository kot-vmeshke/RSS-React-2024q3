import { FC, ReactNode, useContext } from 'react';
import { FlyingList } from './FlyingList';
import { Header } from './Header';
import { Main } from './Main';
import { ThemeContext } from '../context/ThemeContext';

const SearchPage: FC<{children?: ReactNode}> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page ${theme}`} data-testid="page-container">
      <Header />
      <Main />
      <FlyingList />
      {children}
    </div>
  );
};

export { SearchPage };

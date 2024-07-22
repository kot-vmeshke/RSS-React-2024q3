import { FC, useContext, useState } from 'react';
import { FlyingList, Header, Main } from '../../components';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchPage: FC = () => {
  const { theme } = useContext(ThemeContext);

  const [searchString] = useLocalStorage();
  const [, setNewSearchString] = useState<string>(
    searchString || ''
  );

  const updateSearchString = (str: string) => {
    setNewSearchString(str);
  };

  return (
    <div className={`page ${theme}`} data-testid="page-container">
      <Header updateSearchString={updateSearchString} />
      <Main />
      <FlyingList />
    </div>
  );
};

export { SearchPage };

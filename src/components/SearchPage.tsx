import { FC, useContext } from 'react';
//import { FlyingList, Header, Main } from '../old/components';
//import { ThemeContext } from '../../old/context/ThemeContext';

const SearchPage: FC = () => {
  //const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex h-screen`} data-testid="page-container">
      {/* <Header />
      <Main />
      <FlyingList /> */}
      Hello, Next!
    </div>
  );
};

export { SearchPage };

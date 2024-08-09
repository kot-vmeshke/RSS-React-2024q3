'use client';

import { Data, setData } from '../store/dataSlice';
import { FC, ReactNode, useContext } from 'react';
import { FlyingList } from './FlyingList';
import { Header } from './Header';
import { Main } from './Main';
import { ThemeContext } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';

const SearchPage: FC<{ children?: ReactNode; data?: Data }> = ({
  children,
  data,
}) => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  dispatch(setData(data!));

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

'use client';

import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} page items-center justify-center text-color-text`}
    >
      <h1 className="text-color-text text-[72px] font-[100]">404</h1>
      This page doesn't exist
      <a href="/" className="main-button mt-[40px]">
        Go to main page
      </a>
    </div>
  );
};

export { ErrorPage };

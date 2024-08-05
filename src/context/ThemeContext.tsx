'use client';

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

interface ContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}
interface ThemeContextProviderProps {
  children: ReactNode;
}

const defaultContext = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ContextType>(defaultContext);

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    console.log(document.cookie);
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('book-theme='))
      ?.split('=')[1];
    const value = cookieValue || 'light';
    setTheme(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

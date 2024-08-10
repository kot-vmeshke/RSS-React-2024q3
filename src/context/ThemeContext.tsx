import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const defaultContext = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ContextType>(defaultContext);

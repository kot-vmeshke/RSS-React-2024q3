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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const value = localStorage.getItem('book-theme') || 'light';
    setTheme(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { ChangeEvent, FC } from 'react';
import { Moon, Sun } from './icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setTheme } from '../store/themeSlice';

const ThemeSwitch: FC = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(e.target.value));
    console.log(e.target.value);
    localStorage.setItem('book-theme', e.target.value);
  };

  return (
    <div className="switch">
      <input
        type="radio"
        name="theme"
        id="dark"
        checked={theme === 'dark'}
        value="dark"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="dark" data-testid="dark-button">
        <Moon />
      </label>
      <input
        type="radio"
        name="theme"
        id="light"
        checked={theme === 'light'}
        value="light"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="light" data-testid="light-button">
        <Sun />
      </label>
    </div>
  );
};

export { ThemeSwitch };

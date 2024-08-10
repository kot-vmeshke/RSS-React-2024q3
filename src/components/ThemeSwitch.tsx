import { ChangeEvent, FC } from 'react';
import { Moon, Sun } from './icons';

const ThemeSwitch: FC = () => {
  const theme = 'light';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //setTheme(e.target.value);
    console.log(e.target.value);
    localStorage.setItem('book-theme', e.target.value);
  };

  return (
    <div className="switch">
      <input
        type="radio"
        name="theme"
        id="dark"
        //checked={theme === 'dark'}
        checked={false}
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

import '../styles/globals.css';
import { Metadata } from 'next';
import { ReduxProvider } from '../store/redux-provider';
import { ThemeContextProvider } from '../context/ThemeContext';

export const metadata: Metadata = {
  title: 'Search book',
  description: 'You can find everything! :)',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeContextProvider>
            {children}
            </ThemeContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;

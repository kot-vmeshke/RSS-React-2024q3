import { ReactNode } from 'react';
import { SearchPage } from '../../components';

export default function BookLayout({ children }: { children: ReactNode }) {
  return <SearchPage>{children}</SearchPage>;
}

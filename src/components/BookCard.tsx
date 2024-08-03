import { Book } from '../types';
import { CheckButton } from './CheckButton';
import { FC } from 'react';
import Link from 'next/link';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {
  return (
    <li>
      <div className="relative flex flex-col items-start justify-start h-[100%] p-[16px] rounded-[16px] bg-color-bg-medium dark:bg-dark-color-bg-medium self-top">
        <CheckButton bookId={id} />
        <span className="mb-[8px] pr-[40px] font-[300] text-[14px] text-color-text dark:text-dark-color-text">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <Link
          href={`/${id}`}
          className="mt-auto font-medium text-[20px] text-color-text dark:text-dark-color-text after:absolute after:inset-0 after:content-['']"
          data-testid="book"
        >
          {title}
        </Link>
        <span className="font-light text-[12px] text-color-text dark:text-dark-color-text">
          Subjects: {subjects.join(', ')}.
        </span>
      </div>
    </li>
  );
};

export { BookCard };

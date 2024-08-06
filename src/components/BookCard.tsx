'use client';

import { FC, useEffect, useState } from 'react';
import { Book } from '../types';
import { CheckButton } from './CheckButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    let str = '';
    for (const [key, value] of searchParams.entries()) {
      console.log(`${key}, ${value}`);
      str += `${key}=${value}`;
    }
    setSearchString(str);
  }, [searchParams]);

  return (
    <li>
      <div className="relative flex flex-col items-start justify-start h-[100%] p-[16px] rounded-[16px] bg-color-bg-medium dark:bg-dark-color-bg-medium self-top">
        <CheckButton bookId={id} />
        <span className="mb-[8px] pr-[40px] font-[300] text-[14px] text-color-text dark:text-dark-color-text">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <Link
          href={`/${id}?${searchString}`}
          className="mt-auto font-medium text-[20px] text-color-text dark:text-dark-color-text after:absolute after:inset-0 after:content-['']"
          data-testid={`book`}
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

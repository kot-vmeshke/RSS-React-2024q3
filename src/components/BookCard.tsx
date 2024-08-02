// import './BookCard.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Book } from '../types';
import { CheckButton } from './CheckButton';
import { FC } from 'react';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {
  const [searchParams] = useSearchParams();

  return (
    <li>
      <div className="relative flex flex-col items-start justify-start h-[100%] p-[16px] bg-color-bg-medium">
        <CheckButton bookId={id} />
        <span className="mb-[8px] pr-[40px] font-sans font-[300] text-[14px] text-color-text">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <Link
          to={`book/${id}?${searchParams.toString()}`}
          className="mt-auto font-medium text-[20px] text-color-text after:absolute after:inset-0 after:content-none"
          data-testid="book"
        >
          {title}
        </Link>
        <span className="font-light text-[12px] text-color-text">Subjects: {subjects.join(', ')}.</span>
      </div>
    </li>
  );
};

export { BookCard };

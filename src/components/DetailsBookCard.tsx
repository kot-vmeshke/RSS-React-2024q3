import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Person } from '../types';
import defaultCover from '../assets/no-cover.jpg';
import readIcon from '../assets/share-03.svg';
import { useAppSelector } from '../store/store';
import { useRouter } from 'next/router';

const DetailsBookCard: FC = () => {
  const router = useRouter();
  const bookId = router.query.slug;

  const books = useAppSelector((state) => state.books);
  const book = books.find(item => item.id == Number(bookId));

  return (
    <div className="details" data-testid="details">
      <Link href={`/`} className="details__close" data-testid="close-btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <>
        <div className="details__cover">
          <Image
            src={book!.formats!['image/jpeg'] || defaultCover}
            alt=""
            width={216}
            height={150}
          />
        </div>
        <h3 className="details__name">{book!.title}</h3>
        <p className="details__author">
          {book!.authors
            .map(
              (author: Person) =>
                `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
            )
            .join(',')}
        </p>
        <div className="details__wrap">
          <p className="details__type">Subjects:</p>
          <p className="details__text">{book!.subjects.join(', ')}</p>
        </div>
        <div className="details__wrap">
          <p className="details__type">Bookshelves:</p>
          <p className="details__text">
            {book!.bookshelves?.length ? book!.bookshelves.join(', ') : '-'}
          </p>
        </div>
        {book!.formats!['text/html'] && (
          <a
            href={book!.formats!['text/html']}
            className="details__download"
            target="_blank"
          >
            Read
            <Image src={readIcon} alt="" width={12} height={12} />
          </a>
        )}
      </>
    </div>
  );
};

export { DetailsBookCard };

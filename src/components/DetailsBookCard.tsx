'use client';

import { FC, useEffect, useState } from 'react';
import { DetailsProps } from '../pages/[slug]';
import Image from 'next/image';
import Link from 'next/link';
import { Person } from '../types';
import defaultCover from '../assets/no-cover.jpg';
import readIcon from '../assets/share-03.svg';
import { useRouter } from 'next/router';

const DetailsBookCard: FC<DetailsProps> = ({ book }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [queryString, setQueryString] = useState('');
  // const router = useRouter();
  // const query = router.query;

  // useEffect(() => {
  //   if (Object.keys(query).filter((key) => key !== 'slug').length) {
  //     const temp = [];
  //     for (const key in query) {
  //       if (key !== 'slug') temp.push(`${key}=${query[key]}`);
  //     }
  //     const string = temp.join('&');
  //     setQueryString('?' + string);
  //   }
  // }, [query]);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-color-bg-dark dark:bg-dark-color-bg-dark bg-opacity-20 dark:bg-opacity-20 backdrop-blur-sm">
          <div
            className="w-[50%] fixed inset-[0_0_0_auto] bg-color-bg-light dark:bg-dark-color-bg-light p-[64px_48px]"
            data-testid="details"
          >
            <Link
              href={`/${queryString}`}
              className="absolute top-[24px] right-[24px] text-color-text dark:text-dark-color-text"
              data-testid="close-btn"
              onClick={() => setIsVisible(false)}
            >
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
              <div className="w-[216px] h-[150px] mb-[16px] overflow-hidden">
                <Image
                  src={book!.formats!['image/jpeg'] || defaultCover}
                  alt=""
                  width={216}
                  height={150}
                  priority={true}
                  className="block w-full h-full object-contain object-left"
                />
              </div>
              <h3 className="mb-[8px] font-medium text-[20px] text-color-text dark:text-dark-color-text">
                {book!.title}
              </h3>
              <p className="mb-[32px] font-light text-[14px] text-color-text dark:text-dark-color-text">
                {book!.authors
                  .map(
                    (author: Person) =>
                      `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
                  )
                  .join(',')}
              </p>
              <div className="mb-[12px]">
                <p className="mb-[4px] font-medium text-[12px] text-color-text dark:text-dark-color-text">
                  Subjects:
                </p>
                <p className="font-light text-[14px] text-color-text dark:text-dark-color-text">
                  {book!.subjects.join(', ')}
                </p>
              </div>
              <div>
                <p className="mb-[4px] font-medium text-[12px] text-color-text dark:text-dark-color-text">
                  Bookshelves:
                </p>
                <p className="font-light text-[14px] text-color-text dark:text-dark-color-text">
                  {book!.bookshelves?.length
                    ? book!.bookshelves.join(', ')
                    : '-'}
                </p>
              </div>
              {book!.formats!['text/html'] && (
                <a
                  href={book!.formats!['text/html']}
                  className="flex items-center  justify-center gap-[10px] w-full max-w-[164px] m-[32px_auto_0_0] p-[8px_16px] border-0 rounded-[32px] font-light text-[14px] text-color-text dark:text-dark-color-text bg-color-bg-dark dark:bg-dark-color-bg-dark"
                  target="_blank"
                >
                  Read
                  <Image
                    src={readIcon}
                    alt=""
                    width={12}
                    height={12}
                    className="dark:invert"
                  />
                </a>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export { DetailsBookCard };

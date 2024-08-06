import { Book, Person } from '../types';
import { FC, Suspense } from 'react';
import Image from 'next/image';
import { LinkWithParams } from './LinkWithParams';
import defaultCover from '../assets/no-cover.jpg';
import readIcon from '../assets/share-03.svg';

const DetailsBookCard: FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="fixed inset-0 bg-color-bg-dark dark:bg-dark-color-bg-dark bg-opacity-20 dark:bg-opacity-20 backdrop-blur-sm">
      <div
        className="w-[50%] fixed inset-[0_0_0_auto] bg-color-bg-light dark:bg-dark-color-bg-light p-[64px_48px]"
        data-testid="details"
      >
        <Suspense>
          <LinkWithParams
            classes={
              'absolute top-[24px] right-[24px] text-color-text dark:text-dark-color-text'
            }
          />
        </Suspense>
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
              {book!.bookshelves?.length ? book!.bookshelves.join(', ') : '-'}
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
  );
};

export { DetailsBookCard };

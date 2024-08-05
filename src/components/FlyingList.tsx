'use client';

import { Book, Person } from '../types';
import { FC, useEffect, useState } from 'react';
import {
  removeAllBooksFromSelected,
  removeBookFromSelected,
} from '../store/selectedBooksSlice';
import { useAppSelector } from '../store/store';
import { useDispatch } from 'react-redux';

const FlyingList: FC = () => {
  const [url, setUrl] = useState<string>('');
  const selectedBooks: Book[] = useAppSelector((state) => state.selectedBooks);
  const dispatch = useDispatch();

  const handleDeselectAllClick = () => {
    dispatch(removeAllBooksFromSelected());
  };

  const getCSV = (arr: Book[]) => {
    let csv: string = '';
    const temp = [['title', 'authors', 'link']];

    arr.forEach((book: Book) => {
      const data = [];
      const authors = book.authors
        .map(
          (author: Person) =>
            `${author.name.replace(/,/g, '')} (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
        )
        .join(',');
      const link = book.formats!['text/html'] ?? '-';

      data.push(`"${book.title}"`, authors, link);

      temp.push(data);
    });

    temp.forEach((item: string[]) => {
      csv += item.join(';') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);
    return objUrl;
  };

  useEffect(() => {
    if (selectedBooks.length) {
      setUrl(getCSV(selectedBooks));
    }
  }, [selectedBooks]);

  return (
    <div
      className={`fixed bottom-[48px] right-[48px] w-[400px] p-[24px] rounded-[16px] font-medium text-[18px] text-color-text dark:text-dark-color-text bg-color-bg-dark dark:bg-dark-color-bg-dark ${selectedBooks.length ? 'block' : 'hidden'}`}
    >
      {selectedBooks.length} items selected:
      <ul className="w-full h-auto max-h-[300px] m-[20px_0_0] font-normal text-[14px] overflow-y-auto mask scrollbar-none">
        {selectedBooks.map((item: Book) => (
          <li
            key={item.id}
            className="flex items-center justify-start gap-[24px] w-full [&:not(:last-child)]:mb-[14px] last:mb-[40px]"
            data-testid="selected-item"
          >
            {item.title}
            <button
              className="inline-block ml-auto shrink-0 px-[8px] py-[4px] rounded-[40px] border border-color-bg-light dark:border-dark-color-bg-light border-solid bg-transparent text-color-text dark:text-dark-color-text"
              onClick={() => dispatch(removeBookFromSelected(item.id))}
            >
              Unselect
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-[16px]">
        <button
          className="main-button m-[24px_auto_0] border border-color-bg-light dark:border-dark-color-bg-light text-[14px] bg-transparent"
          onClick={handleDeselectAllClick}
          data-testid="unselect-all"
        >
          Unselect {selectedBooks.length > 1 ? 'All' : ''}
        </button>
        <a
          href={url}
          title="Download CSV"
          className="main-button m-[24px_auto_0] border border-color-bg-light dark:border-dark-color-bg-light text-[14px] bg-color-bg-light dark:bg-dark-color-bg-light"
          download={`${selectedBooks.length}_books.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export { FlyingList };

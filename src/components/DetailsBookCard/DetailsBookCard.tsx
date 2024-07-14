import { Link, useParams } from 'react-router-dom';
import './DetailsBookCard.scss';
import readIcon from '../../assets/share-03.svg';
import defaultCover from '../../assets/no-cover.jpg';
import { Book } from '../../types';
import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';

const DetailsBookCard: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [book, setBook] = useState<Book>();
  const { bookId } = useParams();

  const fetchBook = async (id: string) => {
    setIsLoaded(false);
    try {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBook(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBook(bookId);
    }
  }, [bookId]);

  return (
    <div className="details" data-testid="details">
      <Link to="/" className="details__close">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      {isLoaded && book ? (
        <>
          <div className="details__cover">
            <img
              src={book.formats!['image/jpeg'] || defaultCover}
              alt=""
              width={216}
              height={150}
            />
          </div>
          <h3 className="details__name">{book.title}</h3>
          <p className="details__author">
            {book.authors
              .map(
                (author) =>
                  `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
              )
              .join(',')}
          </p>
          <div className="details__wrap">
            <p className="details__type">Subjects:</p>
            <p className="details__text">{book.subjects.join(', ')}</p>
          </div>
          <div className="details__wrap">
            <p className="details__type">Bookshelves:</p>
            <p className="details__text">
              {book.bookshelves?.length ? book.bookshelves.join(', ') : '-'}
            </p>
          </div>
          {book.formats!['text/html'] && (
            <a
              href={book.formats!['text/html']}
              className="details__download"
              target="_blank"
            >
              Read
              <img src={readIcon} alt="" width={12} height={12} />
            </a>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { DetailsBookCard };

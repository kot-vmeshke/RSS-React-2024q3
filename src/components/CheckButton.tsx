import { FC } from 'react';
import { Checkbox, CheckboxEmpty } from './icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addBookToSelected,
  removeBookFromSelected,
} from '../store/selectedBooksSlice';
import { Book } from '../types';

interface CheckButtonProps {
  book: Book;
}

const CheckButton: FC<CheckButtonProps> = ({ book }) => {
  const selectedBooks: Book[] = useAppSelector((state) => state.selectedBooks);

  const isSelected: boolean = Boolean(
    selectedBooks.find((item) => item.id === book.id)
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addBookToSelected(book));
    } else {
      dispatch(removeBookFromSelected(book.id));
    }
  };

  return (
    <div className="check-button-wrap">
      <input
        type="checkbox"
        checked={isSelected}
        id={`check-${book.id}`}
        onChange={handleChange}
        data-testid="checkbox"
      />
      <label
        htmlFor={`check-${book.id}`}
        title={isSelected ? 'Remove from selected' : 'Add to selected'}
      >
        {isSelected ? <Checkbox /> : <CheckboxEmpty />}
      </label>
    </div>
  );
};

export { CheckButton };

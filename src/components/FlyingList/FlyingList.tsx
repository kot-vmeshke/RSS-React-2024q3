import './FlyingList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from '../../store/store';
import { removeAllBooksFromSelected } from '../../store/selectedBooksSlice';

const FlyingList: FC = () => {
  const selectedBooks: number[] = useSelector(
    (state: RootState) => state.selectedBooks
  );
  const dispatch = useDispatch();

  const handleDeselectAllClick = () => {
    dispatch(removeAllBooksFromSelected());
  };

  return (
    <div className={`fly ${selectedBooks.length ? 'fly_visible' : ''}`}>
      Selected {selectedBooks.length} items
      <div className="fly__controls">
        <button
          className="main-button main-button_bordered"
          onClick={handleDeselectAllClick}
        >
          Unselect {selectedBooks.length > 1 ? 'All' : ''}
        </button>
        <button className="main-button">Download</button>
      </div>
    </div>
  );
};

export { FlyingList };

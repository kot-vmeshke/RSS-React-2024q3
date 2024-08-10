import { FC } from 'react';
import { Checkbox, CheckboxEmpty } from './icons';

interface CheckButtonProps {
  bookId: number;
}

const CheckButton: FC<CheckButtonProps> = ({ bookId }) => {
  const isSelected = false;

  return (
    <div className="check-button-wrap">
      <input
        type="checkbox"
        checked={isSelected}
        id={`check-${bookId}`}
        // onChange={handleChange}
        data-testid="checkbox"
      />
      <label
        htmlFor={`check-${bookId}`}
        title={isSelected ? 'Remove from selected' : 'Add to selected'}
      >
        {isSelected ? <Checkbox /> : <CheckboxEmpty />}
      </label>
    </div>
  );
};

export { CheckButton };

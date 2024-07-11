import { render, screen } from '@testing-library/react';

import { BookCard } from '../src/components';
import { describe, it } from 'vitest';

describe('BookCard', () => {
  it('renders headline', () => {
    render(<BookCard title={'1'} authors={[]} subjects={['a', 'v']}/>);
    screen.debug();
  });
});

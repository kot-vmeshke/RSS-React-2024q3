import { loader as mainLoader } from '../app/root';
import { loader as bookLoader } from '../app/routes/$bookId';

describe('Main Loader', () => {
  it('should return a response', async () => {
    const response = await mainLoader({
      request: new Request('https://gutendex.com/books'),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
  });
});

describe('Book Loader', () => {
  it('should return a response', async () => {
    const response = await bookLoader({
      request: new Request('https://gutendex.com/books/1'),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
  });
});

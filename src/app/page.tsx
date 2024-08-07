import { Data } from '../store/dataSlice';
import { SearchPage } from '../components';

export const getData = async (search: string, page: string) => {
  try {
    const res = await fetch(
      `https://gutendex.com/books?search=${search || ''}&page=${page || 1}`,
      {
        cache: 'no-cache',
      }
    );
    const data: Data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const data = await getData(
    searchParams.search || '',
    searchParams.page || '1'
  );
  return (
    <>
      <SearchPage data={data} />
    </>
  );
}

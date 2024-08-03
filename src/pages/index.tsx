import type { InferGetServerSidePropsType } from 'next';
import { SearchPage } from '../components';
import { setBooks } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

export const getServerSideProps = async (context: {
  query: { search: string; page: string };
}) => {
  const { search, page } = context.query;
  try {
    const res = await fetch(
      `https://gutendex.com/books?search=${search || ''}&page=${page || 1}`,
      {
        cache: 'no-cache',
      }
    );
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error(error);
  }
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  dispatch(setBooks(data.results));

  return <SearchPage />;
}

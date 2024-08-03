import type { InferGetServerSidePropsType } from 'next';
import { SearchPage } from '../components';
import { setBooks } from '../store/dataSlice';
import { useDispatch } from 'react-redux';

export const getServerSideProps = async () => {
  try {
    const res = await fetch('https://gutendex.com/books', {
      cache: 'no-cache',
    });
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

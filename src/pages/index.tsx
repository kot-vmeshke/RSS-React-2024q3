import { Data, setData } from '../store/dataSlice';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SearchPage } from '../components';
import { useDispatch } from 'react-redux';

export const getServerSideProps = (async (context) => {
  const { search, page } = context.query;
  try {
    const res = await fetch(
      `https://gutendex.com/books?search=${search || ''}&page=${page || 1}`,
      {
        cache: 'no-cache',
      }
    );
    const data: Data = await res.json();
    return { props: { data: data } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
      },
    };
  }
}) satisfies GetServerSideProps<{ data: Data }>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  dispatch(setData(data));

  return <SearchPage />;
}

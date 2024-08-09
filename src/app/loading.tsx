import { Loader } from '../components';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] p-[150px] bg-color-bg-light dark:bg-dark-color-bg-light">
      <Loader />
    </div>
  );
};

export default Loading;

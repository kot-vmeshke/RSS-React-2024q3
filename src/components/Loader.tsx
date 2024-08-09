const Loader = () => {
  return (
    <div className="abcolute inset-0 flex items-center justify-center text-color-text dark:text-dark-color-text">
      <div
        className="w-[fit-content] font-normal text-[16px] pb-[8px] after:content-['Loading...'] animate-loading"
        style={{
          background:
            'linear-gradient(currentColor 0 0) 0 100%/0% 1px no-repeat',
        }}
        data-testid="loader"
      ></div>
    </div>
  );
};

export { Loader };

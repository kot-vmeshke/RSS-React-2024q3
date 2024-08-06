'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const LinkWithParams: FC<{ classes: string }> = ({ classes }) => {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const str = [];
    for (const [key, value] of searchParams.entries()) {
      str.push(`${key}=${value}`);
    }
    setSearchString(str.join('&'));
  }, [searchParams]);

  return (
    <Link
      href={`/?${searchString}`}
      className={classes}
      data-testid="close-btn"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 7L7 17M7 7L17 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export { LinkWithParams };

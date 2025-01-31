import Link from 'next/link';
import React, { ReactNode } from 'react';

const ParallelLayout = ({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) => {
  return (
    <div>
      <div>
        <Link href={'/parallel'}>parallel</Link>
        &nbsp;
        <Link href={'/parallel/setting'}>parallel setting</Link>
      </div>
      <br />
      {sidebar}
      {feed}
      {children}
    </div>
  );
};

export default ParallelLayout;

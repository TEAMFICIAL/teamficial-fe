'use client';

import { useState } from 'react';
import MyTeamTitle from './_components/MyTeamTitle';
import MyTeamList from './_components/MyTeamList';

const Page = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <MyTeamTitle />
      <MyTeamList page={page} setPage={setPage} />
    </>
  );
};

export default Page;

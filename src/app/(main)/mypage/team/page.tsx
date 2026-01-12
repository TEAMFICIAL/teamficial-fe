'use client';

import { useState } from 'react';
import MyTeamTitle from './_components/MyTeamTitle';
import MyTeamList from './_components/MyTeamList';
import MobileHeader from '@/components/common/MobileHeader';

const Page = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <MobileHeader title="참여중인 팀" />
      <div className="tablet:bg-transparent -mx-4 min-h-full bg-gray-100">
        <MyTeamTitle />
        <MyTeamList page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default Page;

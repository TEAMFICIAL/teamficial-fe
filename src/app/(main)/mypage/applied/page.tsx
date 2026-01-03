'use client';

import { useState } from 'react';
import AppliedTeamList from './_components/AppliedTeamList';
import AppliedTitle from './_components/AppliedTitle';
import MobileHeader from '@/components/common/MobileHeader';

const Page = () => {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <MobileHeader title="내가 지원한 팀" />
      <div className="tablet:bg-transparent -mx-4 min-h-full bg-gray-100">
        <AppliedTitle applicantStatus={status} setApplicantStatus={setStatus} />
        <AppliedTeamList status={status} page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default Page;

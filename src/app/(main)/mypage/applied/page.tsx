'use client';

import { useState } from 'react';
import AppliedTeamList from './_components/AppliedTeamList';
import AppliedTitle from './_components/AppliedTitle';

const Page = () => {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <AppliedTitle applicantStatus={status} setApplicantStatus={setStatus} />
      <AppliedTeamList status={status} page={page} setPage={setPage} />
    </>
  );
};

export default Page;

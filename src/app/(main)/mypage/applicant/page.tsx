'use client';

import { useState } from 'react';
import ApplicantTeamList from './_components/ApplicantTeamList';
import ApplicantTitle from './_components/ApplicantTitle';

const Page = () => {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <ApplicantTitle applicantStatus={status} setApplicantStatus={setStatus} />
      <ApplicantTeamList status={status} page={page} setPage={setPage} />
    </>
  );
};

export default Page;

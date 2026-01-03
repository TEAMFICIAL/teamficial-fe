'use client';

import { useState } from 'react';
import ApplicantTeamList from './_components/ApplicantTeamList';
import ApplicantTitle from './_components/ApplicantTitle';
import MobileHeader from '@/components/common/MobileHeader';

const Page = () => {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <MobileHeader title="지원자 현황" />

      <div className="tablet:bg-transparent -mx-4 min-h-full bg-gray-100">
        <ApplicantTitle applicantStatus={status} setApplicantStatus={setStatus} />
        <ApplicantTeamList status={status} page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default Page;

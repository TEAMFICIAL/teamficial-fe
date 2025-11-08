'use client';

import Pagination from '@/components/common/Pagination';
import AppliedTeamCard from './AppliedTeamCard';
import { useState } from 'react';

const AppliedTeamList = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <>
      <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
        <p className="w-25 text-center">순번</p>
        <p className="w-150.75 text-center">제목 및 내용</p>
        <p className="w-30 text-center">지원현황</p>
        <p className="w-30.25 text-center">지원날짜</p>
      </div>
      <div className="mb-5 flex flex-col">
        <AppliedTeamCard />
        <AppliedTeamCard />
        <AppliedTeamCard />
        <AppliedTeamCard />
        <AppliedTeamCard />
        <AppliedTeamCard />
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default AppliedTeamList;

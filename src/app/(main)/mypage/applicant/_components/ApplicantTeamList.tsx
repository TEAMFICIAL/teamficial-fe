'use client';

import Pagination from '@/components/common/Pagination';
import ApplicantTeamCard from './ApplicantTeamCard';
import { useState } from 'react';

const ApplicantTeamList = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <>
      <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
        <p className="w-25 text-center">순번</p>
        <p className="w-153 text-center">제목 및 내용</p>
        <p className="w-58 text-center">공고 마감일</p>
      </div>
      <div className="mb-5 flex flex-col">
        <ApplicantTeamCard />
        <ApplicantTeamCard />
        <ApplicantTeamCard />
        <ApplicantTeamCard />
        <ApplicantTeamCard />
        <ApplicantTeamCard />
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default ApplicantTeamList;

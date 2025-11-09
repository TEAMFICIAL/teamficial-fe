'use client';

import Pagination from '@/components/common/Pagination';
import AppliedTeamCard from './AppliedTeamCard';
import { useMyApplications } from '@/hooks/queries/useApplicant';

interface AppliedTeamListProps {
  status: string;
  page: number;
  setPage: (page: number) => void;
}

const AppliedTeamList = ({ status, page, setPage }: AppliedTeamListProps) => {
  const { data } = useMyApplications(status, page - 1, 3);

  const applications = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
        <p className="w-25 text-center">순번</p>
        <p className="w-150.75 text-center">제목 및 내용</p>
        <p className="w-30 text-center">지원현황</p>
        <p className="w-30.25 text-center">지원날짜</p>
      </div>
      <div className="mb-5 flex flex-col">
        {applications.length > 0 ? (
          applications.map((app, idx) => (
            <AppliedTeamCard key={app.recruitingPostId} applicant={app} index={idx + 1} />
          ))
        ) : (
          <p className="py-10 text-center text-gray-500">지원 내역이 없습니다.</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default AppliedTeamList;

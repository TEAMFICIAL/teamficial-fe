'use client';

import Pagination from '@/components/common/Pagination';
import ApplicantTeamCard from './ApplicantTeamCard';
import { useCurrentApplicants } from '@/hooks/queries/useApplicant';

interface ApplicantTeamListProps {
  status: string;
  page: number;
  setPage: (page: number) => void;
}

const ApplicantTeamList = ({ status, page, setPage }: ApplicantTeamListProps) => {
  const { data } = useCurrentApplicants(status, page - 1, 3);

  const applicants = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
        <p className="w-25 text-center">순번</p>
        <p className="w-153 text-center">제목 및 내용</p>
        <p className="w-58 text-center">공고 마감일</p>
      </div>
      <div className="mb-5 flex flex-col">
        {applicants.length > 0 ? (
          applicants.map((app, idx) => (
            <ApplicantTeamCard key={app.recruitingPostId} application={app} index={idx + 1} />
          ))
        ) : (
          <p className="py-10 text-center text-gray-500">모집 현황이 없습니다.</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default ApplicantTeamList;

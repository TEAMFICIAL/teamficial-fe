'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import ApplicantTeamCard from './ApplicantTeamCard';
import { useCurrentApplicants } from '@/hooks/queries/useApplicant';
import { CurrentApplicant } from '@/types/applicant';
import Button from '@/components/common/button/Button';

interface ApplicantTeamListProps {
  status: string;
  page: number;
  setPage: (page: number) => void;
}

const ApplicantTeamList = ({ status, page, setPage }: ApplicantTeamListProps) => {
  const [mobilePage, setMobilePage] = useState(1);
  const [allApplicants, setAllApplicants] = useState<CurrentApplicant[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(status);

  const { data } = useCurrentApplicants(status, page - 1, 6);
  const { data: mobileData, isLoading: isMobileLoading } = useCurrentApplicants(
    status,
    mobilePage - 1,
    20,
  );

  const applicants = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (currentStatus !== status) {
      setMobilePage(1);
      setHasMore(true);
      setCurrentStatus(status);
    }
  }, [status, currentStatus]);

  useEffect(() => {
    if (mobileData) {
      const newApplicants = mobileData.content ?? [];
      if (mobilePage === 1) {
        setAllApplicants(newApplicants);
      } else {
        setAllApplicants((prev) => [...prev, ...newApplicants]);
      }
      setHasMore(mobilePage < (mobileData.totalPages ?? 1));
    }
  }, [mobileData, mobilePage]);

  const handleLoadMore = () => {
    if (hasMore && !isMobileLoading) {
      setMobilePage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="tablet:hidden mx-4 flex flex-col gap-2">
        {allApplicants.length > 0 ? (
          <>
            {allApplicants.map((app, idx) => (
              <ApplicantTeamCard key={app.recruitingPostId} application={app} index={idx + 1} />
            ))}
            {hasMore && !isMobileLoading && (
              <Button
                onClick={handleLoadMore}
                className="body-7 bg-gray-0 w-full cursor-pointer border border-gray-300 px-4 py-2.5 text-gray-800"
              >
                더보기
              </Button>
            )}
          </>
        ) : isMobileLoading ? (
          <p className="py-10 text-center text-gray-500">로딩 중...</p>
        ) : (
          <p className="py-10 text-center text-gray-500">모집 현황이 없습니다.</p>
        )}
      </div>
      <div className="tablet:block hidden">
        <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
          <p className="w-25 text-center">순번</p>
          <p className="w-153 text-center">제목 및 내용</p>
          <p className="w-58 text-center">공고 마감일</p>
        </div>
        <div className="mb-5 flex flex-col">
          {applicants.length > 0 ? (
            applicants.map((app, idx) => (
              <ApplicantTeamCard
                key={app.recruitingPostId}
                application={app}
                index={(page - 1) * 6 + idx + 1}
              />
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">모집 현황이 없습니다.</p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  );
};

export default ApplicantTeamList;

'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import AppliedTeamCard from './AppliedTeamCard';
import { useMyApplications } from '@/hooks/queries/useApplicant';
import { Application } from '@/types/applicant';
import Button from '@/components/common/button/Button';

interface AppliedTeamListProps {
  status: string;
  page: number;
  setPage: (page: number) => void;
}

const AppliedTeamList = ({ status, page, setPage }: AppliedTeamListProps) => {
  const [mobilePage, setMobilePage] = useState(1);
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(status);

  const { data } = useMyApplications(status, page - 1, 6);
  const { data: mobileData, isLoading: isMobileLoading } = useMyApplications(
    status,
    mobilePage - 1,
    20,
  );

  const applications = data?.content ?? [];
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
      const newApplications = mobileData.content ?? [];
      if (mobilePage === 1) {
        setAllApplications(newApplications);
      } else {
        setAllApplications((prev) => [...prev, ...newApplications]);
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
        {allApplications.length > 0 ? (
          <>
            {allApplications.map((app, idx) => (
              <AppliedTeamCard key={app.recruitingPostId} applicant={app} index={idx + 1} />
            ))}
            {hasMore && !isMobileLoading && (
              <Button
                onClick={handleLoadMore}
                className="body-7 w-full cursor-pointer border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800"
              >
                더보기
              </Button>
            )}
          </>
        ) : isMobileLoading ? (
          <p className="py-10 text-center text-gray-500">로딩 중...</p>
        ) : (
          <p className="py-10 text-center text-gray-500">지원 내역이 없습니다.</p>
        )}
      </div>
      <div className="tablet:block hidden">
        <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
          <p className="w-25 text-center">순번</p>
          <p className="w-150.75 text-center">제목 및 내용</p>
          <p className="w-30 text-center">지원현황</p>
          <p className="w-30.25 text-center">지원날짜</p>
        </div>
        <div className="mb-5 flex flex-col">
          {applications.length > 0 ? (
            applications.map((app, idx) => (
              <AppliedTeamCard
                key={app.recruitingPostId}
                applicant={app}
                index={(page - 1) * 6 + idx + 1}
              />
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">지원 내역이 없습니다.</p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  );
};

export default AppliedTeamList;

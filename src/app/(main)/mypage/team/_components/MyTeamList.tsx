'use client';

import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import MyTeamCard from './MyTeamCard';
import { useMyTeams } from '@/hooks/queries/useMyTeams';
import { MyTeamItem } from '@/types/myteam';
import Button from '@/components/common/button/Button';

interface MyTeamListProps {
  page: number;
  setPage: (page: number) => void;
}

const MyTeamList = ({ page, setPage }: MyTeamListProps) => {
  const [mobilePage, setMobilePage] = useState(1);
  const [allTeams, setAllTeams] = useState<MyTeamItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data } = useMyTeams(page - 1, 6);
  const { data: mobileData, isLoading: isMobileLoading } = useMyTeams(mobilePage - 1, 20);

  const teams = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (mobileData) {
      const newTeams = mobileData.content ?? [];
      if (mobilePage === 1) {
        setAllTeams(newTeams);
      } else {
        setAllTeams((prev) => [...prev, ...newTeams]);
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
      <div className="tablet:hidden mx-4 flex flex-col gap-2 pt-5">
        {allTeams.length > 0 ? (
          <>
            {allTeams.map((team, idx) => (
              <MyTeamCard key={team.postId} team={team} index={idx + 1} />
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
          <p className="py-10 text-center text-gray-500">참여중인 팀이 없습니다.</p>
        )}
      </div>
      <div className="tablet:block hidden">
        <div className="body-6 flex border-b border-gray-300 bg-gray-100 py-4.5">
          <p className="w-25 text-center">순번</p>
          <p className="w-153 text-center">제목 및 내용</p>
          <p className="w-58 text-center">팀원 수</p>
        </div>
        <div className="mb-5 flex flex-col">
          {teams.length > 0 ? (
            teams.map((item, idx) => (
              <MyTeamCard key={item.postId} team={item} index={(page - 1) * 6 + idx + 1} />
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">참여중인 팀이 없습니다.</p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  );
};

export default MyTeamList;

'use client';

import { useState } from 'react';
import Banner from './_components/Banner';
import ButtonContainer from './_components/ButtonContainer';
import RecruitCard from './_components/RecruitCard';
import Pagination from '../../../components/common/Pagination';
import { useRouter } from 'next/navigation';
import { ResponseProject } from '@/types/project';
import { PERIOD_KR, POSITION_KR, PROGRESS_WAY_KR } from '@/constants/Translate';
import { Filters, useRecruitingPosts } from '@/hooks/queries/useRecruitingPosts';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    duration: '',
    recruit: '',
    onlyOpen: true,
  });

  const { data, isLoading, isError } = useRecruitingPosts(filters, currentPage, 9);
  const currentCards = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const router = useRouter();
  const handleCardClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <main className="flex flex-col">
      <div className="py-5">
        <Banner />
      </div>
      <div className="w-full pt-5">
        <ButtonContainer onChange={setFilters} />
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorDisplay message="데이터를 불러오는 중 오류가 발생했습니다." />
      ) : (
        <div className="grid grid-cols-3 gap-4 py-5">
          {currentCards.map((card: ResponseProject) => (
            <RecruitCard
              key={card.postId}
              title={card.title}
              hashtag={card.recruitingPositions
                .map((r) => `#${POSITION_KR[r.position] || r.position}`)
                .join(' ')}
              author={card.userName}
              date={card.createdAt.split('T')[0]}
              duration={PERIOD_KR[card.period] || card.period}
              mode={PROGRESS_WAY_KR[card.progressWay] || card.progressWay}
              dday={card.dday}
              status={card.status}
              onClick={() => handleCardClick(card.postId)}
            />
          ))}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export default Page;

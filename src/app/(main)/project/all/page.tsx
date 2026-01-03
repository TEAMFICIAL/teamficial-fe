'use client';

import { Filters, useRecruitingPosts } from '@/hooks/queries/useRecruitingPosts';
import ButtonContainer from '../_components/ButtonContainer';
import RecruitCard from '../_components/RecruitCard';
import { useState, useEffect } from 'react';
import { ResponseProject } from '@/types/project';
import { PERIOD_KR, POSITION_KR, PROGRESS_WAY_KR } from '@/constants/Translate';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';
import MobileHeader from '@/components/common/MobileHeader';
import Button from '@/components/common/button/Button';
import { useIsMobile } from '@/hooks/useIsMobile';

const AllProjectPage = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState<ResponseProject[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    duration: '',
    recruit: '',
    onlyOpen: true,
  });

  useEffect(() => {
    if (!isMobile) {
      router.replace('/project');
    }
  }, [isMobile, router]);

  const { data, isLoading, isError } = useRecruitingPosts(filters, currentPage, 20);

  useEffect(() => {
    if (data) {
      const newCards = data.content ?? [];
      if (currentPage === 1) {
        setAllCards(newCards);
      } else {
        setAllCards((prev) => [...prev, ...newCards]);
      }
      setHasMore(currentPage < (data.totalPages ?? 1));
    }
  }, [data, currentPage, filters]);

  useEffect(() => {
    setCurrentPage(1);
    setAllCards([]);
  }, [filters]);

  if (isLoading && currentPage === 1) return <Loading />;
  if (isError) return <ErrorDisplay />;

  const handleCardClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <MobileHeader title="프로젝트" />
      <div className="py-5">
        <ButtonContainer onChange={setFilters} />
      </div>
      <div className="mb-2 flex flex-col gap-2">
        {allCards.map((card: ResponseProject, index) => (
          <div
            key={card.postId}
            className={index === allCards.length - 1 && !hasMore ? 'pb-25' : ''}
          >
            <RecruitCard
              title={card.title}
              profileImageUrl={card.profileImageUrl}
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
          </div>
        ))}
      </div>
      {hasMore && !isLoading && (
        <div className="pb-27">
          <Button
            onClick={handleLoadMore}
            className="body-7 w-full cursor-pointer border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800"
          >
            더보기
          </Button>
        </div>
      )}
      <div className="bg-gray-0 fixed right-0 bottom-0 left-0 z-50 flex w-full px-4 pt-3 pb-5">
        <Button
          onClick={() => router.push('/recruit')}
          className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 w-full px-5 py-4"
        >
          팀원 모집하기
        </Button>
      </div>
    </div>
  );
};

export default AllProjectPage;

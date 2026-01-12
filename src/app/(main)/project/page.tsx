'use client';

import { useState, useEffect } from 'react';
import Banner from './_components/Banner';
import ButtonContainer from './_components/ButtonContainer';
import RecruitCard from './_components/RecruitCard';
import Pagination from '../../../components/common/Pagination';
import { useRouter } from 'next/navigation';
import { ResponseProject } from '@/types/project';
import { PERIOD_KR, POSITION_KR, PROGRESS_WAY_KR } from '@/constants/Translate';
import {
  Filters,
  useRecruitingPosts,
  useInfiniteRecruitingPosts,
} from '@/hooks/queries/useRecruitingPosts';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';
import Button from '@/components/common/button/Button';
import { useInView } from 'react-intersection-observer';

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    duration: '',
    recruit: '',
    onlyOpen: true,
  });

  const pageSize = 9;
  const mobilePageSize = 10;
  const initialDisplayCount = 5;
  const loadMoreCount = 10;

  const { data, isLoading, isError } = useRecruitingPosts(filters, currentPage, pageSize);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isMobileLoading,
    isError: isMobileError,
    isInitialLoading: isMobileInitialLoading,
  } = useInfiniteRecruitingPosts(filters, mobilePageSize);

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  useEffect(() => {
    setDisplayCount(initialDisplayCount);
  }, [filters]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const allMobileCards = infiniteData?.pages.flatMap((page) => page.content) ?? [];

  const mobileCards = allMobileCards.slice(0, displayCount);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      const nextDisplayCount = displayCount + loadMoreCount;

      if (nextDisplayCount > allMobileCards.length) {
        fetchNextPage();
      } else {
        setDisplayCount(nextDisplayCount);
      }
    }
  }, [inView, hasNextPage, isFetchingNextPage, displayCount, allMobileCards.length, fetchNextPage]);

  useEffect(() => {
    if (infiniteData && allMobileCards.length > 0) {
      const currentTotalCards = allMobileCards.length;
      if (!hasNextPage && displayCount < currentTotalCards) {
        setDisplayCount(currentTotalCards);
      }
      if (displayCount > currentTotalCards) {
        setDisplayCount(Math.max(initialDisplayCount, currentTotalCards));
      }
    }
  }, [infiniteData, hasNextPage, displayCount, allMobileCards.length]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const isInitialLoading = (isLoading && currentPage === 1) || isMobileInitialLoading;

  if (isInitialLoading) return <Loading />;
  if (isError || isMobileError) return <ErrorDisplay />;

  const tabletCards = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCardClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <main className="flex flex-col">
      <div className="tablet:py-5">
        <Banner />
      </div>
      <div className="tablet:pt-5 w-full pt-5 pb-3">
        <ButtonContainer filters={filters} onChange={handleFilterChange} />
      </div>
      <div className="tablet:grid tablet:py-5 tablet:gap-4 tablet:grid-cols-3 flex flex-col gap-2">
        <div className="tablet:contents hidden">
          {tabletCards.length > 0
            ? tabletCards.map((card: ResponseProject) => (
                <RecruitCard
                  key={card.postId}
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
              ))
            : !isLoading && (
                <p className="col-span-3 py-10 text-center text-gray-500">프로젝트가 없습니다.</p>
              )}
        </div>
        <div className="tablet:hidden mb-28 flex flex-col gap-2">
          {mobileCards.length > 0 ? (
            <>
              {mobileCards.map((card: ResponseProject, index) => (
                <div key={card.postId} ref={index === mobileCards.length - 1 ? ref : undefined}>
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
              {isFetchingNextPage && mobileCards.length > initialDisplayCount && (
                <div className="py-4 text-center text-gray-500">불러오는 중...</div>
              )}
            </>
          ) : (
            !isMobileLoading && (
              <p className="py-10 text-center text-gray-500">프로젝트가 없습니다.</p>
            )
          )}
        </div>
      </div>

      <div className="tablet:hidden bg-gray-0 fixed right-0 bottom-0 left-0 z-50 flex w-full px-4 pt-3 pb-5">
        <Button
          onClick={() => router.push('/recruit')}
          className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 w-full px-5 py-4"
        >
          모집글 작성하기
        </Button>
      </div>

      <div className="tablet:block hidden">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </main>
  );
};

export default Page;

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
import Button from '@/components/common/button/Button';

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    duration: '',
    recruit: '',
    onlyOpen: true,
  });

  const { data, isLoading, isError } = useRecruitingPosts(filters, currentPage, 9);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay />;

  const currentCards = data?.content ?? [];
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
        <ButtonContainer onChange={setFilters} />
      </div>
      <div className="tablet:grid tablet:py-5 tablet:gap-4 tablet:grid-cols-3 flex flex-col gap-2">
        {currentCards.map((card: ResponseProject) => (
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
        ))}
      </div>

      <div className="tablet:hidden flex justify-center py-3">
        <Button
          className="body-5 w-full cursor-pointer border border-gray-300 bg-gray-50 px-5 py-3 text-gray-800"
          onClick={() => router.push('/project/mobile/all')}
        >
          공고 전체보기
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

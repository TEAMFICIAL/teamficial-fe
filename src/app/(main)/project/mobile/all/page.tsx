'use client';

import { Filters, useRecruitingPosts } from '@/hooks/queries/useRecruitingPosts';
import ButtonContainer from '../../_components/ButtonContainer';
import RecruitCard from '../../_components/RecruitCard';
import { useState } from 'react';
import { ResponseProject } from '@/types/project';
import { PERIOD_KR, POSITION_KR, PROGRESS_WAY_KR } from '@/constants/Translate';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';

const AllProjectPage = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    duration: '',
    recruit: '',
    onlyOpen: true,
  });

  const { data, isLoading, isError } = useRecruitingPosts(filters, currentPage, 20);
  const currentCards = data?.content ?? [];
  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay />;

  const handleCardClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="flex flex-col px-4">
      <div className="py-5">
        <ButtonContainer />
      </div>
      <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default AllProjectPage;

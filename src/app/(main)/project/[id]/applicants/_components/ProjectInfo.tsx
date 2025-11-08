'use client';
import DOMPurify from 'isomorphic-dompurify';
import React, { useState } from 'react';
import ProjectTitle from './ProjectTitle';
import { useGetProjectApplicants } from '@/hooks/queries/useProject';
import Image from 'next/image';
import InfoCard from './InfoCard';
import CurrentApplicants from './CurrentApplicants';
import { PositionType } from '@/utils/position';
import Button from '@/components/common/Button';
import { useModal } from '@/contexts/ModalContext';
import { useParams } from 'next/dist/client/components/navigation';
import { POSITION_KR } from '@/constants/Translate';

const ProjectInfo = ({ id }: { id: string }) => {
  const { openModal } = useModal();
  const params = useParams();
  const recruitingPostId = Number(params.id);

  const handleFinishClick = (recruitingPostId: number) => {
    if (!params) return;
    openModal('applicateFinish', {
      recruitingPostId,
    });
  };

  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<PositionType | undefined>(undefined);

  const { data } = useGetProjectApplicants({
    postId: Number(id),
    position: selectedPosition,
  });

  const handleFilterChange = (position?: PositionType) => {
    setSelectedPosition(position);
  };

  if (!data) return null;

  const sanitizedContent = DOMPurify.sanitize(data.recruitingPost.recruitingPostContent);

  const hasAnyApplicants = data.applicantList.length > 0;
  const isFilterApplied = !!selectedPosition; // 필터가 적용되었는지 확인
  const isFilteredButEmpty = isFilterApplied && !hasAnyApplicants; // 필터 적용했는데 결과가 없음

  return (
    <>
      <ProjectTitle {...data.recruitingPost} />
      <div className="mb-14 flex flex-col gap-4">
        <InfoCard {...data.recruitingPost} />
        {isContentOpen && (
          <div className="prose max-w-none rounded-2xl border border-gray-300 p-10 text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        )}
        <button
          className="body-6 flex cursor-pointer items-center justify-center gap-[5px] rounded-lg border border-gray-300 py-3 text-gray-800"
          type="button"
          onClick={() => setIsContentOpen(!isContentOpen)}
        >
          {isContentOpen ? '본문 접어두기' : '본문 확인하기'}
          <Image
            src={isContentOpen ? '/icons/arrow-up-gray.svg' : '/icons/arrow-down-gray.svg'}
            alt="toggle content"
            width={24}
            height={16}
          />
        </button>
        {/* 지원자 현황 */}
        <CurrentApplicants
          applicants={data.applicantList}
          filter={selectedPosition}
          onFilterChange={handleFilterChange}
        />
        {!hasAnyApplicants && (
          <div className="body-3 flex h-143 flex-col items-center justify-center text-gray-600">
            <p>아직 지원자가 없어요</p>
            <p>조금만 더 기다려볼까요?</p>
          </div>
        )}

        {isFilteredButEmpty && (
          <div className="body-3 flex h-143 flex-col items-center justify-center text-gray-600">
            <p>이 파트는 아직 지원자가 없어요</p>
            <p>조금만 더 기다려볼까요?</p>
          </div>
        )}

        {/* 지원자가 있을 때만 버튼 */}
        {hasAnyApplicants && (
          <div className="flex justify-end">
            <Button label="팀원 모집 마치기" onClick={() => handleFinishClick(recruitingPostId)} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectInfo;

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

const ProjectInfo = ({ id }: { id: string }) => {
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
        <div className="flex justify-end">
          <Button label="팀원 모집 마치기" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;

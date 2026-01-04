'use client';
import DOMPurify from 'isomorphic-dompurify';
import React, { useEffect, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import ErrorDisplay from '@/components/common/Error';
import MobileHeader from '@/components/common/MobileHeader';

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

  const { data, isError } = useGetProjectApplicants({
    postId: Number(id),
    position: selectedPosition,
  });

  const router = useRouter();

  useEffect(() => {
    if (data?.recruitingPost.status === '모집 마감') {
      router.replace(`/project/${id}`);
    }
  }, [data?.recruitingPost.status, id, router]);

  const handleFilterChange = (position?: PositionType) => {
    setSelectedPosition(position);
  };

  if (isError)
    return (
      <div className="my-40">
        <ErrorDisplay />
      </div>
    );
  if (!data) return null;

  const sanitizedContent = DOMPurify.sanitize(data.recruitingPost.recruitingPostContent);

  const filteredApplicants = selectedPosition
    ? data.applicantList.filter((item) => item.profilePosition === POSITION_KR[selectedPosition])
    : data.applicantList;
  const hasAnyApplicants = filteredApplicants.length > 0;
  const isFilterApplied = !!selectedPosition;

  return (
    <>
      <MobileHeader title="지원자 현황" />
      <div className="desktop:bg-gray-0 desktop:pb-14 desktop:mb-0 -mx-4 mb-22 bg-gray-50 px-4 pb-4">
        <ProjectTitle {...data.recruitingPost} />
        <div className="desktop:gap-4 mb-14 flex flex-col gap-3">
          <InfoCard {...data.recruitingPost} />
          {isContentOpen && (
            <div className="prose desktop:bg-gray-0 desktop:p-10 max-w-none rounded-2xl border border-gray-300 bg-gray-50 px-5 py-6 text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
          )}
          <button
            className="body-8 desktop:body-6 bg-gray-0 desktop:mb-0 mb-3 flex cursor-pointer items-center justify-center gap-[5px] rounded-lg border border-gray-300 py-3 text-gray-800"
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
          {!hasAnyApplicants && !isFilterApplied && (
            <div className="body-7 desktop:body-3 desktop:h-143 flex h-60 flex-col items-center justify-center text-gray-600">
              <p>아직 지원자가 없어요</p>
              <p>조금만 더 기다려볼까요?</p>
            </div>
          )}

          {!hasAnyApplicants && isFilterApplied && (
            <div className="body-7 desktop:body-3 desktop:h-143 flex h-60 flex-col items-center justify-center text-gray-600">
              <p>이 파트는 아직 지원자가 없어요</p>
              <p>조금만 더 기다려볼까요?</p>
            </div>
          )}

          {/* 지원자가 있을 때만 버튼 */}
          {data.applicantList.length > 0 && (
            <>
              <div className="tablet:flex hidden justify-end">
                <Button
                  label="팀원 모집 마치기"
                  onClick={() => handleFinishClick(recruitingPostId)}
                />
              </div>
              <div className="tablet:hidden fixed bottom-0 left-0 z-50 flex w-full border-t border-gray-300 bg-white px-4 pt-3 pb-5">
                <Button
                  label="팀원 모집 마치기"
                  onClick={() => handleFinishClick(recruitingPostId)}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;

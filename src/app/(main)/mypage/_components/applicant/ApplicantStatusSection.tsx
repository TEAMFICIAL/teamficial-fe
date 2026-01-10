'use client';

import { MyRecruitingPost } from '@/types/project';
import ApplicantStatusCard from './ApplicantStatusCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSwipeableCards } from '@/hooks/useSwipeableCards';

interface ApplicantStatusSectionProps {
  recruitings: MyRecruitingPost[];
}

const ApplicantStatusSection = ({ recruitings }: ApplicantStatusSectionProps) => {
  const router = useRouter();
  const {
    currentIndex,
    setCurrentIndex,
    displayItems: displayApplicants,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useSwipeableCards({ items: recruitings });

  const handleClick = () => {
    router.push('/mypage/applicant');
  };

  if (displayApplicants.length === 0) return null;

  return (
    <>
      <div className="tablet:py-5 flex w-full justify-between pb-3">
        <p className="tablet:title-2 title-4 text-gray-900">지원자 현황</p>
        <button
          type="button"
          className="tablet:body-6 body-7 flex cursor-pointer gap-1.5 self-end text-gray-700"
          onClick={handleClick}
        >
          전체보기
          <Image
            src="/icons/mypage-right-arrow.svg"
            alt="arrow_right"
            className="tablet:hidden"
            width={7}
            height={12}
          />
        </button>
      </div>
      <div className="tablet:flex hidden gap-4">
        {recruitings.map((post) => (
          <ApplicantStatusCard key={post.recruitingPostId} recruiting={post} />
        ))}
      </div>
      <div className="tablet:hidden mb-7">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayApplicants.map((app) => (
              <div key={app.recruitingPostId} className="min-w-full flex-shrink-0">
                <ApplicantStatusCard recruiting={app} />
              </div>
            ))}
          </div>
        </div>
        {displayApplicants.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {displayApplicants.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-gray-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicantStatusSection;

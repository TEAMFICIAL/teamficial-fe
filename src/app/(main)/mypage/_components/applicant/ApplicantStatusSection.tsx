'use client';

import { MyRecruitingPost } from '@/types/project';
import ApplicantStatusCard from './ApplicantStatusCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ApplicantStatusSectionProps {
  recruitings: MyRecruitingPost[];
}

const ApplicantStatusSection = ({ recruitings }: ApplicantStatusSectionProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleClick = () => {
    router.push('/mypage/applicant');
  };

  const displayApplicants = recruitings.slice(0, 3);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < displayApplicants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
      <div className="tablet:hidden">
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
          <div className="mt-3 mb-7 flex items-center justify-center gap-2">
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

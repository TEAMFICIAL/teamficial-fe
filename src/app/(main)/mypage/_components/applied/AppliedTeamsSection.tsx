'use client';

import { MyApplication } from '@/types/project';
import AppliedTeamCard from './AppliedTeamCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface AppliedTeamSectionProps {
  applications: MyApplication[];
}

const AppliedTeamSection = ({ applications }: AppliedTeamSectionProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleClick = () => {
    router.push('/mypage/applied');
  };

  const displayApplications = applications.slice(0, 3);

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

    if (isLeftSwipe && currentIndex < displayApplications.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (displayApplications.length === 0) return null;

  return (
    <>
      <div className="tablet:py-5 flex w-full justify-between pt-5 pb-3">
        <p className="tablet:title-2 title-4 text-gray-900">내가 지원한 팀</p>
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
      <div className="tablet:flex mb-3 flex hidden gap-4">
        {applications.map((app) => (
          <AppliedTeamCard key={app.recruitingPostId} application={app} />
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
            {displayApplications.map((app) => (
              <div key={app.recruitingPostId} className="min-w-full flex-shrink-0">
                <AppliedTeamCard application={app} />
              </div>
            ))}
          </div>
        </div>
        {displayApplications.length > 1 && (
          <div className="mt-3 mb-7 flex items-center justify-center gap-2">
            {displayApplications.map((_, i) => (
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

export default AppliedTeamSection;

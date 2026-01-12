'use client';

import { MyApplication } from '@/types/project';
import AppliedTeamCard from './AppliedTeamCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSwipeableCards } from '@/hooks/useSwipeableCards';

interface AppliedTeamSectionProps {
  applications: MyApplication[];
}

const AppliedTeamSection = ({ applications }: AppliedTeamSectionProps) => {
  const router = useRouter();
  const {
    currentIndex,
    setCurrentIndex,
    displayItems: displayApplications,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useSwipeableCards({ items: applications });

  const handleClick = () => {
    router.push('/mypage/applied');
  };

  if (applications.length === 0) return null;

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
            {displayApplications.map((app) => (
              <div key={app.recruitingPostId} className="min-w-full flex-shrink-0">
                <AppliedTeamCard application={app} />
              </div>
            ))}
          </div>
        </div>
        {displayApplications.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
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

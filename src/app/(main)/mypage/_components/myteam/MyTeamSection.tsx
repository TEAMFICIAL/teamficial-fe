'use client';

import { useRouter } from 'next/navigation';
import MyTeamCard from './MyTeamCard';
import { MyTeamResponses } from '@/types/project';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface MyTeamSectionProps {
  teams: MyTeamResponses[];
}

const MyTeamSection = ({ teams }: MyTeamSectionProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleClick = () => {
    router.push('/mypage/team');
  };

  const displayTeams = teams.slice(0, 3);

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

    if (isLeftSwipe && currentIndex < displayTeams.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (teams.length === 0) return null;

  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="tablet:title-2 title-4 text-gray-900">참여중인 팀</p>
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
        <div className="flex gap-4">
          {teams.map((team) => (
            <MyTeamCard key={team.postId} myteam={team} />
          ))}
        </div>
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
            {displayTeams.map((team) => (
              <div key={team.postId} className="min-w-full flex-shrink-0">
                <MyTeamCard myteam={team} />
              </div>
            ))}
          </div>
        </div>
        {displayTeams.length > 1 && (
          <div className="mt-3 mb-7 flex items-center justify-center gap-2">
            {displayTeams.map((_, i) => (
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

export default MyTeamSection;

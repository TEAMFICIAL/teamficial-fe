'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';

interface Props {
  onProfileSelect: (profileId: number) => void;
}

const ProfileSlider = ({ onProfileSelect }: Props) => {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: profiles } = useGetProfileList();

  const currentProfile = profiles?.[index];

  // 초기 렌더링 시 첫 번째 프로필 자동 선택
  useEffect(() => {
    if (profiles && profiles.length > 0 && profiles[0].profileId !== undefined) {
      onProfileSelect(profiles[0].profileId);
    }
  }, [profiles]);

  if (!profiles) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < profiles.length - 1) setIndex(index + 1);
  };

  // 카드 클릭 시에만 선택 처리
  const handleCardClick = () => {
    setSelectedIndex(index);
    if (currentProfile?.profileId !== undefined) {
      onProfileSelect(currentProfile.profileId);
    }
  };

  const isSelected = selectedIndex === index;

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`flex w-172 cursor-pointer items-center justify-between gap-2 rounded-2xl border px-5 py-8 transition-all ${
          isSelected
            ? 'border-primary-900 bg-primary-50 border-[2px]'
            : 'border border-gray-300 bg-white'
        }`}
      >
        {index > 0 ? (
          <button onClick={handlePrev} className="cursor-pointer" aria-label="prev">
            <Image src={`/icons/profile_arrow_left.svg`} alt="arrow_left" width={32} height={32} />
          </button>
        ) : (
          <button disabled className="pointer-events-none" aria-label="disabled_prev">
            <Image
              src={`/icons/disabled_arrow_left.svg`}
              alt="disabled_arrow_left"
              width={32}
              height={32}
            />
          </button>
        )}
        {currentProfile && <ProfileCard profile={currentProfile} isSelected={isSelected} />}
        {index < profiles.length - 1 ? (
          <button onClick={handleNext} className="cursor-pointer" aria-label="next">
            <Image
              src={`/icons/profile_arrow_right.svg`}
              alt="arrow_right"
              width={32}
              height={32}
            />
          </button>
        ) : (
          <button disabled className="pointer-events-none" aria-label="disabled_next">
            <Image
              src={`/icons/disabled_arrow_right.svg`}
              alt="disabled_arrow_right"
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        {profiles.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? 'bg-gray-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default ProfileSlider;

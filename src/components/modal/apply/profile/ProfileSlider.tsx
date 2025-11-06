'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import { PositionType } from '@/utils/position';

interface Props {
  onProfileSelect: (profileId: number) => void;
  onPositionSelect: (position: string | null) => void;
  positions: PositionType[];
}

const ProfileSlider = ({ onProfileSelect, onPositionSelect, positions }: Props) => {
  const [index, setIndex] = useState(0);
  const { data: profiles } = useGetProfileList();

  const currentProfile = profiles?.[index];

  useEffect(() => {
    if (currentProfile?.profileId !== undefined) {
      onProfileSelect(currentProfile.profileId);
    }
  }, [currentProfile, onProfileSelect]);

  if (!profiles) return null;

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < profiles.length - 1) setIndex(index + 1);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-300 px-5 py-8">
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
        {currentProfile && (
          <ProfileCard
            profile={currentProfile}
            onPositionSelect={onPositionSelect}
            positions={positions}
          />
        )}
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

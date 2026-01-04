'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import { ResponseProfile } from '@/types/profile';
import { useRouter } from 'next/navigation';

const ProfileSlider = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { data: profiles } = useGetProfileList();

  if (!profiles || profiles.length === 0) return null;

  const currentProfile: ResponseProfile = profiles[index];

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < profiles.length - 1) setIndex(index + 1);
  };

  const handleClickManageProfile = () => {
    router.push('/mypage/profile');
  };

  return (
    <>
      <div className="tablet:hidden flex flex-col gap-2">
        <ProfileCard profile={currentProfile} />
        <button
          onClick={handleClickManageProfile}
          className="body-7 bg-gray-0 mb-5 rounded-lg border border-gray-300 px-5 py-2 text-center text-gray-800"
        >
          프로필 관리하기
        </button>
      </div>
      <div className="tablet:flex hidden w-full items-center justify-between gap-2 rounded-2xl border border-gray-300 px-10 py-8">
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
        <ProfileCard profile={currentProfile} />
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
      <div className="tablet:flex mt-4 mb-8 hidden items-center justify-center gap-4">
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

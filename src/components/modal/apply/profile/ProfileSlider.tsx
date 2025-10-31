'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';

interface Profile {
  id: number;
  name: string;
  contact: string;
  workTime: string;
  keywords: string[];
}

const profiles: Profile[] = [
  {
    id: 1,
    name: '목마른 햄스터님',
    contact: '팀원이 되면 공개해요',
    workTime: '새벽에 작업하는게 편해요',
    keywords: ['피드백장인', '시간잘지킴', '꼼꼼한'],
  },
  {
    id: 2,
    name: '목마른 김지원님',
    contact: '팀원이 되면 공개해요',
    workTime: '새벽에 작업하는게 편해요',
    keywords: ['피드백장인', '시간잘지킴', '꼼꼼한'],
  },
  {
    id: 3,
    name: '목마른 김선화님',
    contact: '팀원이 되면 공개해요',
    workTime: '새벽에 작업하는게 편해요',
    keywords: ['피드백장인', '시간잘지킴', '꼼꼼한'],
  },
];

const ProfileSlider = () => {
  const [index, setIndex] = useState(0);
  const currentProfile = profiles[index];

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

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import Link from 'next/link';

interface Props {
  onProfileSelect: (profileId: number) => void;
}

const ProfileSlider = ({ onProfileSelect }: Props) => {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: allProfiles } = useGetProfileList();

  // 키워드 존재 프로필만 필터링
  const profiles = allProfiles?.filter(
    (profile) => profile.headKeywords && profile.headKeywords.length > 0,
  );

  const currentProfile = profiles?.[index];

  // 초기 렌더링 시 첫 번째 프로필 자동 선택
  useEffect(() => {
    if (profiles && profiles.length > 0 && profiles[0].profileId !== undefined) {
      onProfileSelect(profiles[0].profileId);
    }
  }, [profiles, onProfileSelect]);

  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex h-53 w-172 items-center justify-center rounded-2xl border border-gray-300 bg-gray-50 px-4 py-4">
        <p className="body-4 text-gray-600">
          대표키워드가 설정된 프로필이 없습니다.
          <Link
            href="/teampsylog"
            className="text-primary-900 mx-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            팀피셜록
          </Link>
          에서 대표키워드를 설정해주세요.
        </p>
      </div>
    );
  }

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
        className={`flex w-135 cursor-pointer items-center justify-between gap-1 rounded-2xl border px-2 py-6 transition-all ${
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

'use client';

import { useState, useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import Link from 'next/link';

interface Props {
  onProfileSelect: (profileId: number) => void;
  initialProfileId?: number | null;
}

const MoProfileSlider = ({ onProfileSelect, initialProfileId }: Props) => {
  const { data: allProfiles } = useGetProfileList();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // 키워드 존재 프로필만 필터링
  const profiles = allProfiles?.filter(
    (profile) => profile.headKeywords && profile.headKeywords.length > 0,
  );

  // 초기 인덱스 계산
  const getInitialIndex = () => {
    if (!initialProfileId || !profiles) return 0;
    const foundIndex = profiles.findIndex((p) => p.profileId === initialProfileId);
    return foundIndex >= 0 ? foundIndex : 0;
  };

  const [index, setIndex] = useState(getInitialIndex());

  useEffect(() => {
    if (profiles && initialProfileId) {
      const foundIndex = profiles.findIndex((p) => p.profileId === initialProfileId);
      if (foundIndex >= 0) {
        setIndex(foundIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles?.length, initialProfileId]);

  const currentProfile = profiles?.[index];

  // 인덱스 변경 시 해당 프로필 자동 선택
  useEffect(() => {
    if (currentProfile?.profileId !== undefined) {
      onProfileSelect(currentProfile.profileId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, currentProfile?.profileId]);

  if (!profiles || profiles.length === 0) {
    return (
      <div className="flex h-53 w-full items-center justify-center rounded-2xl border border-gray-300 bg-gray-50 px-5 py-12">
        <p className="body-4 text-center text-gray-600">
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // 최소 스와이프 거리
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && index < profiles.length - 1) {
        // 왼쪽으로 스와이프 (다음)
        setIndex(index + 1);
      } else if (diff < 0 && index > 0) {
        // 오른쪽으로 스와이프 (이전)
        setIndex(index - 1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full cursor-grab active:cursor-grabbing"
      >
        {currentProfile && <ProfileCard profile={currentProfile} isSelected={false} />}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2.5">
        {profiles.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              i === index ? 'bg-gray-500' : 'bg-gray-300'
            }`}
            aria-label={`프로필 ${i + 1}로 이동`}
          />
        ))}
      </div>
    </>
  );
};

export default MoProfileSlider;

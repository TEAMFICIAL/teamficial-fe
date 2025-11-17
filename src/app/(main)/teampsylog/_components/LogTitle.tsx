'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

type LogTitleProps = {
  profiles: ResponseProfile[];
  selectedProfileId: number | null;
  onSelectProfile: (profileId: number) => void;
};

const LogTitle = ({ profiles, selectedProfileId, onSelectProfile }: LogTitleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProfile = profiles.find((p) => p.profileId === selectedProfileId);

  // TODO: 드롭다운 컴포넌트 분리
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const userName = profiles[0]?.userName || '사용자';

  return (
    <div className="flex items-center gap-4 pt-7">
      <p className="title-2">{userName}님의 팀피셜록</p>

      {/* 프로필 선택 드롭다운 */}
      <div ref={dropdownRef} className="relative">
        <div
          className="title-3 flex cursor-pointer gap-1 border-b-2 pb-0.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{selectedProfile?.profileName || '프로필 선택'}</p>
          <Image
            src={isOpen ? '/icons/question_up.svg' : '/icons/question_down.svg'}
            alt="dropdown icon"
            width={24}
            height={24}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {isOpen && profiles.length > 0 && (
          <div className="absolute top-full left-0 z-10 mt-2 min-w-full rounded-md border border-gray-300 bg-white shadow-lg">
            {profiles.map((profile) => (
              <div
                key={profile.profileId}
                className={`body-5 hover:bg-primary-50 cursor-pointer px-4 py-3 whitespace-nowrap ${
                  profile.profileId === selectedProfileId ? 'bg-primary-50' : ''
                }`}
                onClick={() => {
                  onSelectProfile(profile.profileId);
                  setIsOpen(false);
                }}
              >
                {profile.profileName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogTitle;

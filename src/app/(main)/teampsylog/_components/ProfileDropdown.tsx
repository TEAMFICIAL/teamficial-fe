import useOutsideClick from '@/hooks/useOutsideClick';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import { useRef, useState } from 'react';

// 드롭다운만 별도 컴포넌트로 분리
const ProfileDropdown = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
}: {
  profiles: ResponseProfile[];
  selectedProfileId: number | null;
  onSelectProfile: (profileId: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedProfile = profiles.find((p) => p.profileId === selectedProfileId);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="body-5 bg-gray-0 flex gap-1 rounded-lg border border-gray-300 px-5 py-3 text-gray-800"
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
  );
};

export default ProfileDropdown;

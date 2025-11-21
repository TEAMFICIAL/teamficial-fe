import { useGetKeyword } from '@/hooks/queries/useKeyword';
import React from 'react';
import KeywordItem from './KeywordItem';
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';
import { ResponseProfile } from '@/types/profile';
import { useToast } from '@/contexts/ToastContext';

const DEFAULT_KEYWORDS = ['대표키워드1', '대표키워드2', '대표키워드3'];

const KeywordBar = ({
  profileId,
  profiles,
  selectedProfileId,
  onSelectProfile,
}: {
  profileId: number;
  profiles: ResponseProfile[];
  selectedProfileId: number | null;
  onSelectProfile: (profileId: number) => void;
}) => {
  const { data } = useGetKeyword({ profileId });
  const { addToast } = useToast();

  const keywords =
    data?.headKeywords && data.headKeywords.length > 0 ? data.headKeywords : DEFAULT_KEYWORDS;

  const handleShare = async () => {
    let uuid: string | undefined;
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (userString) {
        try {
          const userObj = JSON.parse(userString);
          uuid = userObj?.state?.uuid;
        } catch (e) {
          console.log('Error parsing user from localStorage:', e);
          uuid = undefined;
        }
      }
    }
    const url = uuid
      ? `${window.location.origin}/teampsylog/${uuid}`
      : `${window.location.origin}/teampsylog`;
    await navigator.clipboard.writeText(url);
    addToast({ message: '링크가 복사되었어요' });
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 px-5 py-4">
      {/* 대표키워드 및 프로필 드롭다운 */}
      <div className="flex gap-2">
        <ProfileDropdown
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={onSelectProfile}
        />
        {keywords.map((keyword, index) => (
          <KeywordItem key={`${keyword}-${index}`} keyword={keyword} />
        ))}
      </div>
      <div className="flex gap-4">
        <button className="cursor-pointer">
          <Image src="/icons/edit.svg" alt="수정하기" width={28} height={28} />
        </button>
        <button onClick={handleShare} className="cursor-pointer">
          <Image src="/icons/share.svg" alt="공유하기" width={28} height={28} />
        </button>
      </div>
    </div>
  );
};

export default KeywordBar;

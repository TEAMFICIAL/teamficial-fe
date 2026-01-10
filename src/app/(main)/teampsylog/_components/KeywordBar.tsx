import { useGetKeyword } from '@/hooks/queries/useKeyword';
import React from 'react';
import KeywordItem from './KeywordItem';
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';
import { ResponseProfile } from '@/types/profile';
import { useToast } from '@/contexts/ToastContext';

const KeywordBar = ({
  profileId,
  profiles,
  selectedProfileId,
  onSelectProfile,
  isEditMode,
  onToggleEditMode,
  selectedSlot,
  onSelectSlot,
  isShareMode = false,
}: {
  profileId: number;
  profiles: ResponseProfile[];
  selectedProfileId: number | null;
  onSelectProfile: (profileId: number) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedSlot: number | null;
  onSelectSlot: (index: number) => void;
  isShareMode?: boolean;
}) => {
  const { data } = useGetKeyword({ profileId });
  const { addToast } = useToast();

  const headKeywords = data?.headKeywords || [];
  const desktopDisplayKeywords = [
    ...headKeywords.map((kw) => kw.headKeywordName),
    ...Array(Math.max(0, 3 - headKeywords.length)).fill('키워드를 선택하세요'),
  ];
  const mobileDisplayKeywords = [
    ...headKeywords.map((kw) => kw.headKeywordName),
    ...Array(Math.max(0, 3 - headKeywords.length)).fill('키워드 선택'),
  ];

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
      ? `${window.location.origin}/teampsylog/head/${uuid}`
      : `${window.location.origin}/teampsylog`;
    await navigator.clipboard.writeText(url);
    addToast({ message: '링크가 복사되었어요' });
  };

  if (!isShareMode) return null;
  return (
    <>
      {/* desktop */}
      <div className="desktop:flex hidden items-center justify-between rounded-lg bg-gray-100 px-5 py-4">
        {/* 대표키워드 및 프로필 드롭다운 */}
        <div className="flex items-center gap-2">
          <ProfileDropdown
            profiles={profiles}
            selectedProfileId={selectedProfileId}
            onSelectProfile={onSelectProfile}
          />
          {desktopDisplayKeywords.map((keyword, index) => (
            <KeywordItem
              key={`${keyword}-${index}`}
              keyword={keyword}
              isEditMode={isEditMode}
              isSelected={selectedSlot === index}
              isPlaceholder={index >= headKeywords.length}
              onClick={() => isEditMode && onSelectSlot(index)}
            />
          ))}
        </div>
        {isShareMode && (
          <div className="flex gap-4">
            <button onClick={onToggleEditMode} className="cursor-pointer">
              <Image
                src={isEditMode ? '/icons/edit-selected.svg' : '/icons/edit.svg'}
                alt="수정하기"
                width={28}
                height={28}
              />
            </button>
            <button onClick={handleShare} className="cursor-pointer">
              <Image src="/icons/share.svg" alt="공유하기" width={28} height={28} />
            </button>
          </div>
        )}
      </div>
      {/* mobile */}
      <div className="desktop:hidden z-5 flex flex-col gap-4 py-5">
        {/* 수정 버튼 및 프로필 드롭다운 */}
        <div className="flex justify-between">
          <ProfileDropdown
            profiles={profiles}
            selectedProfileId={selectedProfileId}
            onSelectProfile={onSelectProfile}
          />
          <div className="flex gap-4">
            <button onClick={onToggleEditMode} className="cursor-pointer">
              <Image
                src={isEditMode ? '/icons/edit-selected.svg' : '/icons/edit-black.svg'}
                alt="수정하기"
                width={28}
                height={28}
              />
            </button>
            <button onClick={handleShare} className="cursor-pointer">
              <Image src="/icons/share-black.svg" alt="공유하기" width={28} height={28} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {mobileDisplayKeywords.map((keyword, index) => (
            <KeywordItem
              key={`${keyword}-${index}`}
              keyword={keyword}
              isEditMode={isEditMode}
              isSelected={selectedSlot === index}
              isPlaceholder={index >= headKeywords.length}
              onClick={() => isEditMode && onSelectSlot(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default KeywordBar;

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LogTitle from './LogTitle';
import { useGetProfileList, useGetUuidProfileList } from '@/hooks/queries/useProfile';
import { useGetKeyword } from '@/hooks/queries/useKeyword';
import KeywordBar from './KeywordBar';
import LogNote from './LogNote';
import { useRequesterInfo } from '@/hooks/queries/useRequesterInfo';
import { useUpdateHeadKeywords } from '@/hooks/mutation/useUpdateHeadKeywords';
import { useToast } from '@/contexts/ToastContext';
import Loading from '@/components/common/Loading';
import KeywordGuideOverlay from './KeywordGuideOverlay';

interface Props {
  share?: boolean;
  uuid?: string;
}

const KeywordPage = ({ share = false, uuid }: Props) => {
  // 공유 모드: uuid가 있을 때만 실행
  const requesterInfoResult = useRequesterInfo(uuid ?? '', { enabled: share && !!uuid });
  const requesterInfo = requesterInfoResult.data;
  const shareUserId = share && requesterInfo ? requesterInfo.userId : null;
  const requesterName = requesterInfo?.requesterName;

  // 공유모드 getProfileList 가져오기
  const { data: sharedProfiles } = useGetUuidProfileList(uuid ?? '');

  // TODO: 공유 모드에서 프로필 선택 기능 추가 필요. api 요청.

  // 일반 모드
  const { data: myProfiles } = useGetProfileList();
  // share 모드에 따라 프로필 결정
  const profiles = useMemo(() => {
    if (share) {
      return sharedProfiles || [];
    }
    return myProfiles || [];
  }, [share, sharedProfiles, myProfiles]);

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [localUserId, setLocalUserId] = useState<number | null>(null);

  // 편집 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!share) {
      const hide = localStorage.getItem('hideKeywordGuide');
      if (!hide) setShowGuide(true);
    }
  }, [share]);

  const { mutate: updateHeadKeywords } = useUpdateHeadKeywords();

  const { data: keywordData, isLoading } = useGetKeyword({
    profileId: selectedProfileId ?? 0,
  });

  useEffect(() => {
    if (!share) {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;
        const userData = JSON.parse(userString);
        const userId = userData?.state?.userId;
        if (userId) setLocalUserId(userId);
      } catch {
        setLocalUserId(null);
      }
    }
  }, [share]);

  useEffect(() => {
    if (profiles.length > 0 && selectedProfileId === null) {
      setSelectedProfileId(profiles[0].profileId);
    }
  }, [profiles, selectedProfileId]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setSelectedSlot(null);
    }
  };

  const handleSelectSlot = (index: number) => {
    if (!isEditMode) return;
    setSelectedSlot(index);
  };

  const { addToast } = useToast();

  const handleSelectKeyword = (keywordId: number) => {
    if (!isEditMode || selectedSlot === null || !selectedProfileId) return;

    const headKeywords = keywordData?.headKeywords || [];
    const oldHeadKeywordId =
      selectedSlot < headKeywords.length ? headKeywords[selectedSlot].headKeywordId : undefined;

    updateHeadKeywords(
      {
        profileId: selectedProfileId,
        keywordId,
        oldHeadKeywordId: oldHeadKeywordId ?? 0,
      },
      {
        onSuccess: () => {
          setSelectedSlot(null);
          setIsEditMode(false);
        },
        onError: () => {
          addToast({
            type: 'error',
            title: '이미 등록된 대표키워드입니다.',
            message: '등록하지 않은 키워드를 선택해주세요.',
          });
        },
      },
    );
  };

  if (isLoading && !keywordData) {
    return <Loading />;
  }

  return (
    <div className="desktop:bg-gray-0 -mx-4 flex flex-col gap-5 bg-gray-50 px-4 pb-14">
      {!share && showGuide && <KeywordGuideOverlay onClose={() => setShowGuide(false)} />}
      {/* 제목  */}
      <LogTitle
        profiles={
          share
            ? [
                {
                  profileId: shareUserId ?? 0,
                  userId: shareUserId ?? 0,
                  userName: requesterName ?? '',
                  profileImageUrl: '',
                  profileName: requesterName ?? '',
                  position: '',
                  workingTime: '',
                  links: [],
                  contactWay: '',
                  headKeywords: [],
                  createdAt: '',
                  modifiedAt: '',
                  uuid: '',
                },
              ]
            : profiles
        }
      />
      {/* 키워드 별 대표키워드, 수정하기, 공유하기 */}
      {selectedProfileId !== null && (
        <KeywordBar
          profileId={selectedProfileId}
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={setSelectedProfileId}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
          isShareMode={!share}
        />
      )}
      {/* 팀피셜록 노트 */}
      <LogNote
        userId={share && uuid ? (shareUserId ?? undefined) : (localUserId ?? undefined)}
        isEditMode={isEditMode}
        selectedSlot={selectedSlot}
        onSelectKeyword={handleSelectKeyword}
      />
    </div>
  );
};
export default KeywordPage;

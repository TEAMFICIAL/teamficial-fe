'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LogTitle from './LogTitle';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import KeywordBar from './KeywordBar';
import LogNote from './LogNote';
import { useRequesterInfo } from '@/hooks/queries/useRequesterInfo';

interface Props {
  share?: boolean;
  uuid?: string;
}

const KeywordPage = ({ share = false, uuid }: Props) => {
  // 공유 모드: uuid가 있을 때만 실행
  const requesterInfoResult = useRequesterInfo(uuid ?? '', { enabled: share && !!uuid });
  const requesterInfo = requesterInfoResult.data;
  const shareUserId = share && requesterInfo ? requesterInfo.userId : null;

  // 일반 모드
  const { data: myProfiles } = useGetProfileList();
  const profiles = useMemo(() => myProfiles || [], [myProfiles]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [localUserId, setLocalUserId] = useState<number | null>(null);

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

  return (
    <div className="flex flex-col gap-5 pb-14">
      {/* 제목  */}
      <LogTitle profiles={profiles} />
      {/* 키워드 별 대표키워드, 수정하기, 공유하기 */}
      {selectedProfileId !== null && !share && (
        <KeywordBar
          profileId={selectedProfileId}
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={setSelectedProfileId}
        />
      )}
      {/* 팀피셜록 노트 */}
      <LogNote userId={share && uuid ? (shareUserId ?? undefined) : (localUserId ?? undefined)} />
    </div>
  );
};
export default KeywordPage;

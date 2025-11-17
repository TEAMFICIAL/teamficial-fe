'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LogTitle from './LogTitle';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import KeywordBar from './KeywordBar';
import LogNote from './LogNote';

const KeywordPage = () => {
  const { data } = useGetProfileList();
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  const profiles = useMemo(() => data || [], [data]);

  useEffect(() => {
    if (profiles.length > 0 && selectedProfileId === null) {
      setSelectedProfileId(profiles[0].profileId);
    }
  }, [profiles, selectedProfileId]);

  return (
    <div className="flex flex-col gap-5 pb-14">
      {/* 제목 및 프로필 드롭다운 */}
      <LogTitle
        profiles={profiles}
        selectedProfileId={selectedProfileId}
        onSelectProfile={setSelectedProfileId}
      />
      {/* 키워드 별 대표키워드, 수정하기, 공유하기 */}
      {selectedProfileId !== null && <KeywordBar profileId={selectedProfileId} />}
      {/* 팀피셜록 노트 */}
      <LogNote />
    </div>
  );
};

export default KeywordPage;

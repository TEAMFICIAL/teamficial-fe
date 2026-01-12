'use client';

import { ResponseProfile } from '@/types/profile';
import React from 'react';

type LogTitleProps = {
  profiles: ResponseProfile[];
};

const LogTitle = ({ profiles }: LogTitleProps) => {
  const userName = profiles[0]?.userName || '사용자';

  return (
    <div className="desktop:flex hidden items-center gap-4 pt-7">
      <p className="title-2">{userName}님의 팀피셜록</p>
    </div>
  );
};

export default LogTitle;

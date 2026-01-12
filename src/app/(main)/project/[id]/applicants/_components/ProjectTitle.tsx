'use client';

import { CurrentRecruitingPost } from '@/types/application';
import React from 'react';
import DDay from '../../_components/DDayTag';

const ProjectTitle = ({
  recruitingPostTitle,
  createdAt,
  deadline,
  dday,
  status,
}: CurrentRecruitingPost) => {
  return (
    <div className="desktop:py-7 flex flex-col py-3">
      <div className="desktop:flex-row desktop:gap-2.5 desktop:justify-start flex w-full flex-row items-center justify-between gap-2">
        <p className="desktop:title-1 title-3 min-w-0 break-words whitespace-pre-line text-gray-900">
          {recruitingPostTitle}
        </p>
        <DDay status={status} dday={dday} />
      </div>
      <p className="desktop:body-2 body-8 text-gray-700">
        {createdAt.split('T')[0]}~{deadline}
      </p>
    </div>
  );
};

export default ProjectTitle;

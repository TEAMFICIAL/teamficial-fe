'use client';

import { CurrentRecruitingPost } from '@/types/application';
import React from 'react';
import DDay from '../../_components/DDayTag';

const ProjectTitle = ({
  recruitingPostTitle,
  startDate,
  deadline,
  dday,
}: CurrentRecruitingPost) => {
  return (
    <div className="flex items-center justify-between py-7">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <p className="title-1 text-gray-900">{recruitingPostTitle}</p>
          <DDay status={'OPEN'} dday={dday} />
        </div>
        <p className="body-2 text-gray-700">
          {/* TODO: createdAt 으로 변경 */}
          {startDate.split(' ')[0]}~{deadline}
        </p>
      </div>
    </div>
  );
};

export default ProjectTitle;

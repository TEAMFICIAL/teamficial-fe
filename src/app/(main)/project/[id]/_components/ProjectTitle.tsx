'use client';

import Button from '@/components/common/Button';
import { useModal } from '@/contexts/ModalContext';
import { ResponseProject } from '@/types/project';
import React from 'react';
import DDay from './DDayTag';
import { useIsAuthor } from '@/hooks/useIsAuthor';

const ProjectTitle = ({ title, status, dday, createdAt, deadline, profileId }: ResponseProject) => {
  const isAuthor = useIsAuthor(profileId);

  const { openModal } = useModal();
  const handleApplyModal = () => {
    openModal('apply', { projectId: 123 });
  };
  const handleDeleteModal = () => {
    openModal('delete');
  };

  return (
    <div className="flex items-center justify-between py-7">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <p className="title-1 text-gray-900">{title}</p>
          <DDay status={status} dday={dday} />
        </div>
        <p className="body-2 text-gray-700">
          {createdAt.split(' ')[0]}~{deadline}
        </p>
      </div>
      {!isAuthor ? (
        <div className="flex w-23.5 items-end gap-0.5">
          <button className="body-4 flex-1 cursor-pointer">수정</button>
          <button className="body-4 flex-1 cursor-pointer" onClick={handleDeleteModal}>
            삭제
          </button>
        </div>
      ) : (
        <Button label="지원하기" size="large" onClick={handleApplyModal} />
      )}
    </div>
  );
};

export default ProjectTitle;

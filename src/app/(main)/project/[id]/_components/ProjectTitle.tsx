'use client';

import Button from '@/components/common/Button';
import { useModal } from '@/contexts/ModalContext';
import { ResponseProject } from '@/types/project';
import React from 'react';
import DDay from './DDayTag';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

const ProjectTitle = ({
  postId,
  title,
  status,
  dday,
  createdAt,
  deadline,
  recruitingPositions,
  alreadyApplied,
  writer,
}: ResponseProject) => {
  const { openModal } = useModal();
  const { userName } = useUserStore();
  const isLoggedIn = !!userName;
  const navigate = useRouter();
  const handleApplyModal = () => {
    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.');
      navigate.push('/login');
    } else {
      openModal('apply', { postId, recruitingPositions });
    }
  };
  const handleDeleteModal = () => {
    openModal('delete', { postId: postId, projectName: title });
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
      {writer ? (
        <div className="flex w-23.5 items-end gap-0.5">
          {status == 'OPEN' && (
            <>
              <Link href={`/project/${postId}/edit`}>
                <button className="body-4 flex-1 cursor-pointer">수정</button>
              </Link>
              <button
                className="body-4 flex-1 cursor-pointer text-red-100"
                onClick={handleDeleteModal}
              >
                삭제
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {alreadyApplied ? (
            <Button label="지원완료" variant="gray" disabled size="large" />
          ) : (
            <Button label="지원하기" size="large" onClick={handleApplyModal} />
          )}
        </>
      )}
    </div>
  );
};

export default ProjectTitle;

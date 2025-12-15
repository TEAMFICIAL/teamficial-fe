'use client';

import Button from '@/components/common/Button';
import { useModal } from '@/contexts/ModalContext';
import { ResponseProject } from '@/types/project';
import React from 'react';
import DDay from './DDayTag';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className="desktop:py-7 flex items-center justify-between py-3">
      <div className="flex flex-col">
        <div className="desktop:gap-2.5 flex items-center gap-2">
          <p className="desktop:title-1 title-3 text-gray-900">{title}</p>
          <DDay status={status} dday={dday} />
        </div>
        <p className="desktop:body-2 body-8 text-gray-700">
          {createdAt.split(' ')[0]}~{deadline}
        </p>
      </div>
      {status === 'OPEN' ? (
        writer ? (
          <>
            <div className="desktop:flex hidden w-23.5 items-end gap-0.5">
              <Link href={`/project/${postId}/edit`}>
                <button className="body-4 flex-1 cursor-pointer">수정</button>
              </Link>
              <button
                className="body-4 flex-1 cursor-pointer text-red-100"
                onClick={handleDeleteModal}
              >
                삭제
              </button>
            </div>
            <button className="desktop:hidden block">
              <Image src="/icons/more.svg" alt="more vertical icon" width={24} height={24} />
            </button>
          </>
        ) : (
          <div className="desktop:flex hidden">
            {alreadyApplied ? (
              <Button label="지원완료" variant="gray" disabled size="large" />
            ) : (
              <Button label="지원하기" size="large" onClick={handleApplyModal} />
            )}
          </div>
        )
      ) : null}
    </div>
  );
};

export default ProjectTitle;

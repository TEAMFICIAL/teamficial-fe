'use client';

import Button from '@/components/common/Button';
import { useModal } from '@/contexts/ModalContext';
import { ResponseProject } from '@/types/project';
import React, { useState } from 'react';
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

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleMobileMore = () => {
    setIsMoreOpen(!isMoreOpen);
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
            <button className="desktop:hidden block" onClick={handleMobileMore}>
              <Image src="/icons/more.svg" alt="more vertical icon" width={24} height={24} />
            </button>

            {isMoreOpen && (
              <>
                <div className="fixed inset-0 z-50 bg-black/50" onClick={handleMobileMore} />
                {/* 하단 버튼 영역 */}
                <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col rounded-t-2xl bg-white py-4">
                  <Link href={`/project/${postId}/edit`}>
                    <button
                      className="body-7 w-full bg-gray-50 pb-5 text-gray-800"
                      onClick={handleMobileMore}
                    >
                      수정하기
                    </button>
                  </Link>
                  <div className="h-[1px] bg-gray-300" />
                  <button
                    className="body-7 w-full bg-gray-50 pt-5 text-red-100"
                    onClick={() => {
                      handleDeleteModal();
                      handleMobileMore();
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="desktop:flex hidden">
              {alreadyApplied ? (
                <Button label="지원완료" variant="gray" disabled size="large" />
              ) : (
                <Button label="지원하기" size="large" onClick={handleApplyModal} />
              )}
            </div>
            <div className="desktop:hidden fixed bottom-0 left-0 z-50 block w-full border-t border-gray-300 bg-white px-4 pt-3 pb-5">
              {alreadyApplied ? (
                <Button label="지원완료" variant="gray" disabled size="large" className="w-full" />
              ) : (
                <Button
                  label="지원하기"
                  size="large"
                  onClick={handleApplyModal}
                  className="w-full"
                />
              )}
            </div>
          </>
        )
      ) : null}
    </div>
  );
};

export default ProjectTitle;

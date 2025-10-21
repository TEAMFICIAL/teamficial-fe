'use client';

import Button from '@/components/common/Button';
import React from 'react';

const ProjectTitle = () => {
  // TODO : 작성자 여부에 따른 조건 처리
  const isAuthor = true;

  return (
    <div className="flex items-center justify-between py-7">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <p className="title-1 text-gray-900">제목입니다</p>
          <p className="rounded-sm bg-[#FFD7D9] px-3 py-1 text-[#DA1E28]">D-14</p>
        </div>
        <p className="body-2 text-gray-700">2025.10.12~2025.10.25</p>
      </div>
      {!isAuthor ? (
        <div className="flex w-23.5 items-end gap-0.5">
          <button className="body-4 flex-1 cursor-pointer">수정</button>
          <button className="body-4 flex-1 cursor-pointer">삭제</button>
        </div>
      ) : (
        <Button label="지원하기" size="large" onClick={() => {}} />
      )}
    </div>
  );
};

export default ProjectTitle;

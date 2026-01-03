'use client';

import React from 'react';
import RecruitForm from '@/components/recruit/RecruitForm';
import { useGetProject } from '@/hooks/queries/useProject';

type Props = {
  postId: number;
};

const FormEditor = ({ postId }: Props) => {
  const { data: projectData, isLoading, isError } = useGetProject({ postId });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <p className="body-5 text-gray-600">프로젝트 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !projectData || !projectData.writer) {
    return (
      <div className="desktop:pt-20 flex flex-col items-center justify-center pt-30">
        <p className="desktop:body-5 body-7 text-red-100">
          {!projectData?.writer
            ? '수정 권한이 없습니다.'
            : '프로젝트 정보를 불러오는데 실패했습니다.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col pt-7 pb-5">
        <p className="title-2 text-gray-900">팀원 모집하기</p>
        <p className="body-6 text-gray-700">게시글을 작성하여 원하는 분야의 팀원을 모집해보세요</p>
      </div>
      <RecruitForm mode="edit" initialData={projectData} postId={postId} />;
    </>
  );
};

export default FormEditor;

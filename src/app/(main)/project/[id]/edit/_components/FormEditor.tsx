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

  if (isError || !projectData) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <p className="body-5 text-red-100">프로젝트 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return <RecruitForm mode="edit" initialData={projectData} postId={postId} />;
};

export default FormEditor;

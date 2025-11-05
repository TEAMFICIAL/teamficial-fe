import React from 'react';
import RecruitForm from './_components/RecruitForm';

const page = () => {
  return (
    <>
      <div className="flex flex-col pt-7 pb-5">
        <p className="title-2 text-gray-900">팀원 모집하기</p>
        <p className="body-6 text-gray-700">게시글을 작성하여 원하는 분야의 팀원을 모집해보세요</p>
      </div>
      <RecruitForm />
    </>
  );
};

export default page;

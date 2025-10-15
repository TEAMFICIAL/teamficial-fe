import React from 'react';

type Props = {
  title: string;
};

const ProjectDate = ({ title }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">{title}</p>
      {/* 달력 라이브러리 활용 */}
      <input
        className="body-6 rounded-md border-1 border-gray-300 p-2 px-7 py-3 focus:border-gray-500"
        placeholder="년-월-일을 선택해 주세요"
      />
    </div>
  );
};

export default ProjectDate;

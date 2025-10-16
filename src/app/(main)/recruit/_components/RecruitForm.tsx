'use client';
import React, { useState } from 'react';
import TitleInput from './TitleInput';
import ProcessMethod from './ProcessMethod';
import ProjectDuration from './ProjectDuration';
import RecruitPosition from './RecruitPosition';
import ProjectDate from './ProjectDate';
import TextInput from './TextInput';
import TextContent from './TextContent';

const RecruitForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isEndDateInvalid = startDate !== null && endDate !== null && endDate > startDate;

  return (
    <>
      <div className="flex flex-col gap-3">
        <TitleInput />
        <div className="flex flex-col gap-10 rounded-2xl border-1 border-gray-300 p-10">
          {/* 모집분야/인원 */}
          <RecruitPosition />
          {/* 진행방법 */}
          <ProcessMethod />
          {/* 프로젝트 기간 및 연락처 */}
          <div className="flex flex-col gap-6">
            <ProjectDate title="프로젝트 시작 예정일" date={startDate} setDate={setStartDate} />
            {/* 프로젝트 진행기간 */}
            <ProjectDuration />
            <ProjectDate
              title="공고 마감일"
              date={endDate}
              setDate={setEndDate}
              error={
                isEndDateInvalid ? '공고 마감일은 프로젝트 시작 예정일 이전이어야 합니다.' : ''
              }
            />
            <TextInput title="연락 방법" />
          </div>
        </div>
        <TextContent />
      </div>
      {/* 추후 컴포넌트 분리 */}
      <div className="mt-6 mb-10 flex justify-end">
        <button className="bg-primary-900 text-gray-0 body-3 w-48 rounded-lg py-4">
          업로드하기
        </button>
      </div>
    </>
  );
};

export default RecruitForm;

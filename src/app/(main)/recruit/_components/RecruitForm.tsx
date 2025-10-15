'use client';
import React, { useState } from 'react';
import TitleInput from './TitleInput';
import ProcessMethod from './ProcessMethod';
import ProjectDuration from './ProjectDuration';
import RecruitPosition from './RecruitPosition';
import ProjectDate from './ProjectDate';

const RecruitForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isEndDateInvalid = startDate && endDate && endDate > startDate;

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
              error={isEndDateInvalid ? '공고 마감일은 프로젝트 시작 예정일 이후여야 합니다.' : ''}
            />
            <div className="flex flex-col gap-4">
              <p className="title-3">연락 방법</p>
              <input
                className="body-6 rounded-md border-1 border-gray-300 p-2 px-7 py-3 focus:border-gray-500"
                placeholder="Ex. 카카오톡 오픈채팅 링크"
              />
            </div>
          </div>
        </div>
        <div className="flex rounded-2xl border-1 border-gray-300 px-8 py-4">글 작성 구역</div>
      </div>
      <div className="mt-6 mb-10 flex justify-end">
        <button className="bg-primary-900 text-gray-0 body-3 w-48 rounded-lg py-4">
          업로드하기
        </button>
      </div>
    </>
  );
};

export default RecruitForm;

'use client';

import ApplicantStatusCard from './ApplicantStatusCard';

const ApplicantStatusSection = () => {
  return (
    <div className="mb-14">
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">지원자 현황</p>
        <button
          type="button"
          className="body-6 cursor-pointer self-end text-gray-700"
          onClick={() => {}}
        >
          전체보기
        </button>
      </div>
      <div className="flex gap-4">
        <ApplicantStatusCard />
        <ApplicantStatusCard />
        <ApplicantStatusCard />
      </div>
    </div>
  );
};

export default ApplicantStatusSection;

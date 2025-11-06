'use client';

import AppliedTeamCard from './AppliedTeamCard';

const AppliedTeamSection = () => {
  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">내가 지원한 팀</p>
        <button
          type="button"
          className="body-6 cursor-pointer self-end text-gray-700"
          onClick={() => {}}
        >
          전체보기
        </button>
      </div>
      <div className="mb-3 flex gap-4">
        <AppliedTeamCard />
        <AppliedTeamCard />
        <AppliedTeamCard />
      </div>
    </>
  );
};

export default AppliedTeamSection;

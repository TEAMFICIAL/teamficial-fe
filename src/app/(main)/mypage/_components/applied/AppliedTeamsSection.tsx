'use client';

import { MyApplication } from '@/types/project';
import AppliedTeamCard from './AppliedTeamCard';

interface AppliedTeamSectionProps {
  applications: MyApplication[];
}

const AppliedTeamSection = ({ applications }: AppliedTeamSectionProps) => {
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
        {applications.map((app) => (
          <AppliedTeamCard key={app.recruitingPostId} application={app} />
        ))}
      </div>
    </>
  );
};

export default AppliedTeamSection;

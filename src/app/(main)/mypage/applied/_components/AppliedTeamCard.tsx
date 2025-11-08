'use client';

import Tag from '@/components/common/Tag';

const AppliedTeamCard = () => {
  return (
    <button onClick={() => {}} className="flex cursor-pointer border-b border-gray-300 px-8 py-6">
      <p className="body-6 mr-12 flex w-5 items-center justify-center text-center text-gray-700">
        1
      </p>
      <div className="mr-15 flex flex-col items-start gap-2">
        <div className="flex gap-1">
          <Tag className="bg-gray-200 text-gray-700">3개월</Tag>
          <Tag className="bg-gray-200 text-gray-700">온/오프라인</Tag>
        </div>
        <p className="title-3 w-144.75 text-gray-900">
          팀피셜 팀원구해요 팀피셜 팀원구해요 팀피셜 팀원구해요 팀피셜 팀원구해요
        </p>
        <p className="body-8 mr-12 text-gray-600">#프론트엔드</p>
      </div>
      <Tag className="bg-red-10 mr-12 self-center text-red-100">매칭실패</Tag>
      <p className="body-8 flex w-17 items-center text-gray-700">2025.10.07</p>
    </button>
  );
};

export default AppliedTeamCard;

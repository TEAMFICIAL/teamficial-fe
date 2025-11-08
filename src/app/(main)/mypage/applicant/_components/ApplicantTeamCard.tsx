import Tag from '@/components/common/Tag';

const ApplicantTeamCard = () => {
  return (
    <button onClick={() => {}} className="flex cursor-pointer border-b border-gray-300 px-8 py-6">
      <p className="body-6 mr-12 flex w-5 items-center justify-center text-center text-gray-700">
        1
      </p>
      <div className="mr-31.5 flex flex-col items-start gap-2">
        <div className="flex gap-1">
          <Tag className="bg-primary-50 border-primary-900 text-primary-900 border">
            현재 4명이 지원했어요
          </Tag>
        </div>
        <p className="title-3 w-144.75 text-gray-900">
          팀피셜 팀원구해요 팀피셜 팀원구해요 팀피셜 팀원구해요 팀피셜 팀원구해요
        </p>
        <p className="body-8 mr-12 text-gray-600">#프론트엔드</p>
      </div>
      <Tag className="bg-red-10 mr-16.25 self-center text-red-100">D-14</Tag>
    </button>
  );
};

export default ApplicantTeamCard;

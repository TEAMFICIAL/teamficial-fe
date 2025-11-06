import Tag from '@/components/common/Tag';

const ApplicantStatusCard = () => {
  return (
    <div className="bg-gray-0 w-76 rounded-2xl border border-gray-300 p-5">
      <div className="mb-2.5 flex justify-between">
        <Tag className="bg-primary-50 border-primary-900 text-primary-900 border">
          현재 4명이 지원했어요
        </Tag>
        <Tag className="bg-red-10 text-red-100">D-14</Tag>
      </div>
      <p className="title-3 text-gray-900">팀피셜 팀원구해요</p>
      <div className="body-8 flex gap-1 text-gray-600">
        <p>#프론트엔드</p>
        <p>#프론트엔드</p>
        <p>#프론트엔드</p>
      </div>
    </div>
  );
};

export default ApplicantStatusCard;

import Tag from '@/components/common/Tag';
import Image from 'next/image';

const AppliedTeamCard = () => {
  return (
    <div className="flex w-76 flex-col rounded-2xl border border-gray-300 p-5">
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-1">
          <Tag className="bg-gray-200 text-gray-700">3개월</Tag>
          <Tag className="bg-gray-200 text-gray-700">온/오프라인</Tag>
        </div>
        <Tag className="bg-red-10 text-red-100">매칭실패</Tag>
      </div>
      <p className="title-3 text-gray-900">팀피셜 팀원구해요</p>
      <div className="body-8 mb-5 flex gap-1 text-gray-600">
        <p>#프론트엔드</p>
        <p>#프론트엔드</p>
        <p>#프론트엔드</p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image src="/icons/profile.svg" alt="profile" width={32} height={32} />
          <span className="body-8 text-gray-700">모집글 작성자</span>
        </div>
        <span className="body-8 text-gray-700">2025.10.07</span>
      </div>
    </div>
  );
};

export default AppliedTeamCard;

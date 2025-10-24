import Tag from './Tag';
import Image from 'next/image';

const RecruitCard = () => {
  return (
    <main className="bg-gray-0 flex max-w-[304px] flex-col justify-center gap-6 rounded-lg border-1 border-gray-300 p-5">
      <div className="flex flex-col gap-2.5">
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <Tag type="text">3개월</Tag>
            <Tag type="text">온/오프라인</Tag>
          </div>
          <Tag type="date">D-14</Tag>
        </div>
        <div className="flex flex-col">
          <span className="title-3 text-gray-900">팀피셜 팀원 구해요</span>
          <span className="body-8 text-gray-600">#프론트엔드</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image src="/icons/profile.svg" alt="profile" width={32} height={32} />
          <span className="body-8 text-gray-700">목마른 햄스터</span>
        </div>
        <span className="body-8 text-gray-700">2025.10.07</span>
      </div>
    </main>
  );
};

export default RecruitCard;

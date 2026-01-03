'use client';

import { Tag } from '@/components/common/Tag';
import { MyTeamResponses } from '@/types/project';
import { useRouter } from 'next/navigation';

interface MyTeamCardProps {
  myteam: MyTeamResponses;
}

const MyTeamCard = ({ myteam }: MyTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mypage/team/${myteam.postId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-0 tablet:w-76 w-full cursor-pointer rounded-2xl border border-gray-300 p-5"
    >
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-1">
          <Tag className="body-9 bg-gray-200 text-gray-700">{myteam.period}</Tag>
          <Tag className="body-9 bg-gray-200 text-gray-700">{myteam.progressWay}</Tag>
        </div>
        <Tag className="body-9 bg-blue-50 text-blue-200">{myteam.totalMembers}명 참여</Tag>
      </div>
      <p className="tablet:title-3 body-5 truncate text-gray-900">{myteam.title}</p>
      <div className="tablet:body-8 body-9 flex gap-1 truncate text-gray-600">
        {myteam.tags.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default MyTeamCard;

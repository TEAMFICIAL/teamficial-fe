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
      className="bg-gray-0 w-76 cursor-pointer rounded-2xl border border-gray-300 p-5"
    >
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-1">
          <Tag className="body-9 bg-gray-200 text-gray-700">{myteam.period}</Tag>
          <Tag className="body-9 bg-gray-200 text-gray-700">{myteam.progressWay}</Tag>
        </div>
        <Tag className="body-9 bg-red-10 text-red-100">{myteam.totalMembers}명 참여중</Tag>
      </div>
      <p className="title-3 truncate text-gray-900">{myteam.title}</p>
      <div className="body-8 flex gap-1 truncate text-gray-600">
        {myteam.tags.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default MyTeamCard;

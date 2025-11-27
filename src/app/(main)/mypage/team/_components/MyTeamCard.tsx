'use client';

import { Tag } from '@/components/common/Tag';
import { MyTeamItem } from '@/types/myteam';
import { useRouter } from 'next/navigation';

interface MyTeamCardProps {
  team: MyTeamItem;
  index: number;
}

const MyTeamCard = ({ team, index }: MyTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mypage/team/${team.postId}`);
  };

  return (
    <button onClick={handleClick} className="flex cursor-pointer border-b border-gray-300 py-6">
      <p className="body-6 flex w-25 items-center justify-center text-center text-gray-700">
        {index}
      </p>
      <div className="flex w-153 flex-col items-start gap-2">
        <div className="flex gap-1">
          <Tag className="bg-gray-200 text-gray-700">{team.period}</Tag>
          <Tag className="bg-gray-200 text-gray-700">{team.progressWay}</Tag>
        </div>
        <p className="title-3 flex w-144.75 items-start text-gray-900">{team.title}</p>
        {team.tags.length > 0 && <p className="body-8 text-gray-600">#{team.tags.join(' #')}</p>}
      </div>
      <div className="flex w-58 items-center justify-center">
        <Tag className="bg-blue-50 text-blue-200">{team.totalMembers}명 참여</Tag>
      </div>
    </button>
  );
};

export default MyTeamCard;

'use client';

import { useRouter } from 'next/navigation';
import MyTeamCard from './MyTeamCard';
import { MyTeamResponses } from '@/types/project';

interface MyTeamSectionProps {
  teams: MyTeamResponses[];
}

const MyTeamSection = ({ teams }: MyTeamSectionProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/mypage/applicant');
  };

  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">참여중인 팀</p>
        <button
          type="button"
          className="body-6 cursor-pointer self-end text-gray-700"
          onClick={handleClick}
        >
          전체보기
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-4">
          {teams.map((team) => (
            <MyTeamCard key={team.postId} myteam={team} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTeamSection;

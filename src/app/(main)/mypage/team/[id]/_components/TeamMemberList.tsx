'use client';

import ErrorDisplay from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useConfirmedProfiles } from '@/hooks/queries/useConfirmedProfiles';
import TeamMemberItem from './TeamMemberItem';

interface TeamMemberListProps {
  postId: number;
  position: string;
}

const TeamMemberList = ({ postId, position }: TeamMemberListProps) => {
  const { data, isLoading, error } = useConfirmedProfiles(postId, position);

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message="오류가 발생했습니다." />;
  if (!data || data.length === 0) return <div className="mx-4">팀원이 없습니다</div>;

  return (
    <div className="mx-4 flex flex-col gap-4">
      {data.map((member, index) => (
        <TeamMemberItem key={index} member={member} />
      ))}
    </div>
  );
};

export default TeamMemberList;

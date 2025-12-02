import { ResponseConfirmedProfile } from '@/types/myteam';
import MemberProfile from './MemberProfile';
import MemberInfo from './MemberInfo';
import MemberLinks from './MemberLinks';

interface TeamMemberItemProps {
  member: ResponseConfirmedProfile;
}

const TeamMemberItem = ({ member }: TeamMemberItemProps) => {
  return (
    <div className="bg-gray-0 flex justify-between rounded-2xl border border-gray-300 px-14 py-8">
      <div className="flex gap-7">
        <MemberProfile member={member} />
        <MemberInfo member={member} />
      </div>

      <MemberLinks links={member.links} />
    </div>
  );
};

export default TeamMemberItem;

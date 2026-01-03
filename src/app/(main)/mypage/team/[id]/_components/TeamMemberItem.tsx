import { ResponseConfirmedProfile } from '@/types/myteam';
import MemberProfile from './MemberProfile';
import MemberInfo from './MemberInfo';
import MemberLinks from './MemberLinks';

interface TeamMemberItemProps {
  member: ResponseConfirmedProfile;
}

const TeamMemberItem = ({ member }: TeamMemberItemProps) => {
  return (
    <>
      <div className="tablet:hidden">{/* 기획 컨펌 후 추후 구현 */}</div>
      <div className="tablet:flex bg-gray-0 hidden justify-between rounded-2xl border border-gray-300 px-14 py-8">
        <div className="flex gap-7">
          <MemberProfile member={member} />
          <MemberInfo member={member} />
        </div>
        <MemberLinks links={member.links} />
      </div>
    </>
  );
};

export default TeamMemberItem;

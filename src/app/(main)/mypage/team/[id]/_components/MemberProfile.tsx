import { ResponseConfirmedProfile } from '@/types/myteam';
import Image from 'next/image';

const MemberProfile = ({ member }: { member: ResponseConfirmedProfile }) => {
  return (
    <Image
      src={member.profileImage || '/icons/profile.svg'}
      alt="profile"
      width={100}
      height={100}
      className="h-[100px] w-[100px] rounded-full object-cover"
    />
  );
};

export default MemberProfile;

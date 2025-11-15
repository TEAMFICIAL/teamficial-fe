import { useUserStore } from '@/store/useUserStore';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import ProfileKeywords from './ProfileKeywords';

interface ProfileInfoProps {
  profile?: ResponseProfile;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { userName } = useUserStore();

  return (
    <div className="flex gap-7">
      <Image
        src={profile?.profileImageUrl || '/icons/profile.svg'}
        alt="profile"
        width={100}
        height={100}
        className="h-[100px] w-[100px] self-start rounded-full object-cover"
      />
      <div className="flex flex-col">
        <p className="body-1 mb-2 text-gray-900">{profile?.userName || userName}</p>

        <div className="flex items-center gap-2">
          <p className="body-5 text-gray-800">연락수단</p>
          <div className="h-3 w-[1px] bg-gray-700"></div>
          <p className="body-6 text-gray-600">{profile?.contactWay || '연락수단을 등록해주세요'}</p>
        </div>

        <div className="flex items-center gap-2 pb-5">
          <p className="body-5 text-gray-800">작업시간</p>
          <div className="h-3 w-[1px] bg-gray-700"></div>
          <p className="body-6 text-gray-600">
            {profile?.workingTime
              ? `${profile.workingTime}에 작업하는게 편해요`
              : '작업시간대를 선택해주세요'}
          </p>
        </div>
        <ProfileKeywords keywords={profile?.headKeywords} />
      </div>
    </div>
  );
};

export default ProfileInfo;
